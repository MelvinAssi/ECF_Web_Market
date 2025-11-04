import { useEffect } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
/*
  useEffect(() => {
    const finalizeOrder = async () => {
      try {
        await axios.post("/orders");
        navigate("/user/orders");
      } catch (err) {
        console.error("Erreur lors de la création de la commande:", err);
      }
    };
    finalizeOrder();
  }, []);*/

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Paiement réussi 🎉</h1>
      <p>Votre commande a été enregistrée avec succès !</p>
    </main>
  );
};

export default PaymentSuccessPage;
