import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../services/axios";
import Header from "../components/Header";
import Button from "../components/Button";
import styled from "styled-components";

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color2);
  gap: 20px;
`;
const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  const orderId = searchParams.get("order");

  useEffect(() => {
    if (!orderId) {
      navigate("/", { replace: true });
      return;
    }


    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
    
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Order not found", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <Header reduce={true} />
      <PageContainer >
        <h1>Paiement réussi </h1>
        <p>Merci pour votre commande #{order?.id_order}</p>
        <p>Montant total : {order?.total_amount} €</p>
        <Button text="Accueil" onClick={() => navigate("/")}></Button>
      </PageContainer>
    </>

  );
};

export default PaymentSuccessPage;
