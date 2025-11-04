import { useEffect } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const PaymentCancelPage = () => {
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
  }, []);
*/
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Paiement Echoué 🎉</h1>
      <p>Votre commande !</p>
    </main>
  );
};

export default PaymentCancelPage;
