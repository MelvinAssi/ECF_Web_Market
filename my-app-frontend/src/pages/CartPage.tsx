import styled from "styled-components";
import Header from "../components/Header";  
import { useEffect, useState } from "react";
import axios from "../services/axios";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../components/LazyImage";
import { useCartContext } from "../hooks/useCartContext";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 20px;
`;

const Title = styled.h1`
  color: var(--color1);
  margin-bottom: 10px;
`;

const ClearCart = styled.p`
  color: var(--color3);
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CartContainer = styled.div`
  flex: 2;
  background-color: var(--color5);
  border-radius: 10px;
  padding: 20px;
  min-width: 300px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color4);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  color: var(--color5);
  cursor: pointer;
`;



const ItemInfo = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const DeleteIcon = styled.div`
  background-color: var(--color3);
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--color5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SummaryContainer = styled.div`
  flex: 1;
  background-color: var(--color5);
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  min-width: 250px;
`;

const TotalText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: var(--color1);
`;

const CartPage = () => {
  const {isLoading, cart, clearCart, deleteCartItem,fetchCart } = useCartContext();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  const handleOrder = async () => {
    try {
      await axios.post('/orders');
      fetchCart();
    } catch (error: any) {
      console.error('order error:', error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (!isLoading && cart) {
      const newTotal = cart.listings.reduce((acc, item) => {
        const price = parseFloat(item?.product?.price ?? "0");
        const quantity = item?.quantity ?? 1;
        return acc + price * quantity;
      }, 0);
      setTotal(newTotal);
    }
  }, [isLoading, cart]);

  
  return (
    <>
      <Header />
      <PageContainer>
        <Title>Mon Panier</Title>
        <ClearCart onClick={clearCart}>Vider le panier</ClearCart>

        <CartWrapper>
          <CartContainer>
            {cart && cart.listings && cart.listings.length > 0 ? (
              cart.listings.map((item, index) => (
                <CartItem key={index} onClick={()=>navigate(`/product/${item.id_listing}`)}>
                  <LazyImage width={"100px"} height={"100px"} src={item.product.images?.[0] ?? "/placeholder.png"} alt={item.product.name} />
                  <ItemInfo>
                    <h3>{item.product.name}</h3>
                    <p>{item.product.price} €</p>
                  </ItemInfo>
                  <DeleteIcon onClick={(e) => {e.stopPropagation();deleteCartItem(item.id_listing)}}>
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteIcon>
                </CartItem>
              ))
            ) : (
              <p style={{ color: 'var(--color4)' }}>Votre panier est vide</p>
            )}
          </CartContainer>

          <SummaryContainer>
            <TotalText>Total : {total} €</TotalText>
            <Button onClick={handleOrder} text="Passer la commande" />
          </SummaryContainer>
        </CartWrapper>
      </PageContainer>
    </>
  );
};

export default CartPage;
