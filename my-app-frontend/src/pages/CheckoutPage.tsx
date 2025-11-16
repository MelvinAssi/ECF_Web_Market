
import axios from "../services/axios";
import { useCartContext } from "../hooks/useCartContext";
import Header from "../components/Header";
import styled from "styled-components";
import Button from "../components/Button";

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 20px;
`;



const CheckoutPage = () => {
  const { cart, isLoading } = useCartContext();


  if (isLoading) return <p>Chargement du panier...</p>;
  if (!cart || cart.listings.length === 0) return <p>Votre panier est vide.</p>;


    const total = cart.listings.reduce((acc, item) => {
        const price = parseFloat(item?.product?.price ?? "0");
        const quantity = item?.quantity ?? 1;
        return acc + price * quantity;
      }, 0);
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
                console.log("data:", res.data);
                window.location.href = res.data.url;
              }}
            />
        </PageContainer>
    </>

  );
};

export default CheckoutPage;
