import { useEffect, useState } from "react";
import axios from "../services/axios";
import { useCartContext } from "../hooks/useCartContext";
import Header from "../components/Header";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  min-width: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color1);
  color: var(--color5);
  border-radius: 10px;
  gap: 10px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    min-width: 90%;
  }
`;
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;

  @media (max-width: 767px) {
    padding: 8px;
  }
`;


const StyledError = styled.div`
  color: var(--color3); // #EE2B47
  font-size: 14px;
  margin-top: 4px;
`;

const CheckoutPage = () => {
  const { cart, isLoading } = useCartContext();
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom est requis"),
    cardNuber: Yup.string().required("Le numéro de carte est requis" ),
    expiryDate: Yup.string().required("La date d'expiration est requise"),
    cvv: Yup.string().required("Le CVV est requis"),
  });
  const handleStripeCheckout = async () => {
    try {
      //const response = await axios.post("/payments/create-checkout-session");
      //window.location.href = response.data.url; 
    } catch (err) {
      console.error("Erreur lors de la création de la session Stripe:", err);
    }
  };

  if (isLoading) return <p>Chargement du panier...</p>;
  if (!cart || cart.listings.length === 0) return <p>Votre panier est vide.</p>;


    const total = cart.listings.reduce((acc, item) => {
        const price = parseFloat(item?.product?.price ?? "0");
        const quantity = item?.quantity ?? 1;
        return acc + price * quantity;
      }, 0);

      const handleSubmit = async (cardNuber: string, expiryDate: string, cvv: string, name: string) => {
        try {
          // Envoyer les informations de paiement au backend pour traitement  
          const response = await axios.post("/payments/process-payment", { cardNuber, expiryDate,cvv, name, amount: total });
          console.log("Paiement réussi:", response.data);
        } catch (err) {
          console.error("Erreur lors du traitement du paiement:", err);
        } 
      };
  return (
    <>
        <Header reduce={true} />
        <PageContainer >
            <h1>Paiement sécurisé</h1>
            <p>Total : {total.toFixed(2)} €</p>
            <Button
              text="Procéder au paiement"
              onClick={async () => {
                const order = await axios.post("/orders"); 
                const res = await axios.post("/payments/create-checkout-session", {
                  orderId: order.data.id_order,
                });
                window.location.href = res.data.url;
              }}
            />


        </PageContainer>
    </>

  );
};

export default CheckoutPage;
