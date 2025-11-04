const { Order, CartListing, Cart, Listing } = require("../entities");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async(req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Commande ${order.id_order}`,
            },
            unit_amount: Math.round(order.total_amount * 100), 
          },
          quantity: 1,
        },
      ],
      customer_email: req.user.email,
      success_url: `${process.env.FRONT_URL}/payment-success?order=${order.id_order}`,
      cancel_url: `${process.env.FRONT_URL}/payment-cancel?order=${order.id_order}`,
      metadata: {
        order_id: order.id_order,
        buyer_id: req.user.id,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;
  const orderId = session.metadata?.order_id;
  const userId = session.metadata?.buyer_id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");

    switch (event.type) {
      case 'checkout.session.completed':
        await order.update({ status: 'VALIDATED' });
        await Transaction.update(
          { status: 'COMPLETED' },
          { where: { order_id: orderId } }
        );
        const cart = await Cart.findOne({ where: { buyer_id: userId }, include: { model: CartListing } });
        const listings = await Promise.all( cart.CartListings.map(cl => Listing.findByPk(cl.id_listing, { include: ['product'] }) ) );
        await Promise.all(listings.map(listing =>
          listing.update({ status: 'SOLD' })
        ));
        cart.CartListings.forEach(async (cl) => {
          await CartListing.destroy({ where: { id_cart_listing: cl.id_cart_listing } });
        });
        console.log(`Order ${orderId} completed`);
        break;

      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed':
        await order.update({ status: 'CANCELLED' });
        await Transaction.update(
          { status: 'CANCELLED' },
          { where: { order_id: orderId } }
        );
        console.log(`Order ${orderId} expired or failed`);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
  }

  res.status(200).send();
};


exports.paymentSuccess = async (req, res) => { 
    res.status(200).json({ message: "Payment successful" });    
}   

exports.paymentCancel = async (req, res) => {
    res.status(200).json({ message: "Payment cancelled" });
}