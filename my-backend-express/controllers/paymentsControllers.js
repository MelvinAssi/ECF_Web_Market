const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  Order,
  Cart,
  CartListing,
  Listing,
  Transaction,
  User,
  OrderListing,
  Product,
} = require("../entities");

const TECHREUSE_NET_RATE = 0.10;
const FIXED_FEE = 0.25; // pour couvrir micro-transactions
const VARIABLE_FEE_RATE = 0.015; // 1.5% de frais variables

exports.createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: "Commande introuvable" });

    const orderListings = await OrderListing.findAll({
      where: { order_id: orderId },
      include: {
          model: Listing, as: "Listing" ,
        },
    });
    console.log(orderListings);

    if (orderListings.length === 0)
      return res.status(400).json({ error: "Aucun article trouvé pour cette commande" });

    const line_items = orderListings.map((ol) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `Article ${ol.Listing.id_listing}`,
        },
        unit_amount: Math.round(ol.unit_price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: user.email,
      success_url: `${process.env.FRONT_URL}/payment-success?order=${order.id_order}`,
      cancel_url: `${process.env.FRONT_URL}/payment-cancel?order=${order.id_order}`,
      metadata: {
        order_id: order.id_order,
        buyer_id: req.user.id,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Erreur création session Stripe :", err);
    res.status(500).json({ error: "Échec de création de la session de paiement" });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Signature webhook invalide :", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Event reçu :", event.type);

  // Distribution vers le handler
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handlePaymentCompleted(event.data.object);
        break;

      case "account.updated":
        await handleAccountUpdated(event.data.object);
        break;

      default:
        console.log("Event ignoré :", event.type);
    }
  } catch (err) {
    console.error("Erreur dans un handler :", err);
    return res.status(500).send();
  }

  res.status(200).send();
};

async function handlePaymentCompleted(session) {
  const orderId = session.metadata?.order_id;
  const buyerId = session.metadata?.buyer_id;

  if (!orderId) throw new Error("Order ID manquant dans metadata");

  const order = await Order.findByPk(orderId);
  if (!order) throw new Error("Commande introuvable");

  const orderListings = await OrderListing.findAll({
    where: { order_id: orderId },
    include: [{ model: Listing, as: "Listing" }],
  });


  console.log("Session reçue :", session);



  for (const ol of orderListings) {
    const seller = await User.findByPk(ol.Listing.seller_id);
    if (!seller || !seller.stripe_account_id) continue;

    const sellerShare = ((ol.unit_price-(FIXED_FEE)/orderListings.length )* (1-TECHREUSE_NET_RATE)) ;

    await stripe.transfers.create({
      amount: Math.round(sellerShare * 100),
      currency: "eur",
      destination: seller.stripe_account_id,
      transfer_group: `ORDER_${orderId}`,
    });
  }
  orderListings.forEach(async (ol) => {
    await ol.Listing.update({ status: "SOLD" });
    await CartListing.destroy({
      where: {
        id_listing: ol.Listing.id_listing,  
      },
    });
  });
  
  await order.update({ status: "VALIDATED" });
  await Transaction.update(
    { status: "VALIDATED" },
    { where: { order_id: orderId } }
  );

  console.log(`Commande ${orderId} validée avec succès.`);
}

async function handleAccountUpdated(account) {
  console.log("Compte vendeur mis à jour :", account.id);
  const chargesEnabled = account.charges_enabled;
  const payoutsEnabled = account.payouts_enabled;

    const userId = account.metadata?.userId;

  if (!userId) {
    console.warn("⚠️ Aucun userId dans metadata → fallback DB");
  }


  let user = null;
  if (userId) {
    user = await User.findByPk(userId);
  }
  if (!user) {
    console.warn(" Aucun utilisateur local pour ce compte Stripe");
    return;
  }

  if (chargesEnabled && payoutsEnabled) {
    await user.update({
      stripe_account_id: account.id,
      role: "SELLER"
    });
    console.log(`Onboarding complet pour l'utilisateur ${user.id_user}`);
  }
}

exports.createStripeSellerAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    if (user.stripe_account_id) {
      return res.status(400).json({ error: "Ce compte est déjà vendeur Stripe." });
    }
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: user?.firstname,
        last_name: user?.name,
        email: user?.email,
      },
      business_profile: {
        mcc: "5734",
        product_description: "Marketplace for second-hand tech products",
        url: null,
      },
      metadata: {
        userId: user.id_user   
      }
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.FRONT_URL}/user/become-seller`,
      return_url: `${process.env.FRONT_URL}/user/become-seller`,
      type: "account_onboarding",
    });

    res.json({ onboardingUrl: accountLink.url });
  } catch (err) {
    console.error("Erreur création compte vendeur :", err);
    res.status(500).json({ error: "Erreur création compte Stripe Connect" });
  }
};





exports.paymentSuccess = async (req, res) => {
  res.status(200).json({ message: "Paiement réussi" });
};

exports.paymentCancel = async (req, res) => {
  res.status(200).json({ message: "Paiement annulé" });
};
