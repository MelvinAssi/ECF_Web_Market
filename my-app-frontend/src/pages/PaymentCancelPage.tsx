import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
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
const PaymentCancelPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");


  useEffect(() => {
    // si accès direct sans paramètre => retour à l'accueil
    if (!orderId) {
      navigate("/", { replace: true });
      return;
    }

    // insère un état dans l'historique
    window.history.pushState({ preventBack: true }, "");

    // intercepte le retour
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.preventBack) {
        navigate("/", { replace: true }); // ou "/cart"
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [orderId, navigate]);

  const handleGoToCart = () => {
    navigate("/cart", { replace: true });
  };

  return (
    <>
    <Header reduce={true} />
      <PageContainer >
        <h1>Paiement échoué </h1>
        <p>Votre commande #{orderId} n’a pas été validée.</p>
        <Button text="Retour au panier" onClick={handleGoToCart}></Button>
      </PageContainer>
    </>

  );
};

export default PaymentCancelPage;
