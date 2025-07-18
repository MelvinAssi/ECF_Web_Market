import styled from "styled-components";
import Header from "../components/Header";  
import { useEffect, useState } from "react";
import axios from "../services/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../components/LazyImage";

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
  const { isLoading } = useAuthContext();
  const [itemList, setItemList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const loadCartWithDetails = async () => {
    try {
      const response = await axios.get('/cart');

      const productDetails = await Promise.all(
        response.data.listings.listings.map(async (p: any) => {
          const res = await axios.get(`/listing/${p.id_listing}`);
          return {
            quantity: p.quantity,
            listing: res.data
          };
        })
      );
      console.log(productDetails)
      setItemList(productDetails);
      const newTotal = productDetails.reduce((acc, curr) => acc +  parseFloat(curr.listing.product.price) , 0);
      setTotal(newTotal);

    } catch (error: any) {
      console.error('loadCartWithDetails error:', error.response?.data?.message || error.message);
    }
  };

  const handleOrder = async () => {
    try {
      await axios.post('/orders');
      loadCartWithDetails();
    } catch (error: any) {
      console.error('order error:', error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      await axios.delete(`/cart/remove/${listingId}`);
    } catch (error: any) {
      console.error('handleDelete error:', error.response?.data?.message || error.message);
    } finally {
      loadCartWithDetails();
    }
  };

  const handleClear = async () => {
    try {
      await axios.delete(`/cart/clear`);
    } catch (error: any) {
      console.error('handleDelete error:', error.response?.data?.message || error.message);
    } finally {
      loadCartWithDetails();
    }
  };

  useEffect(() => {
    if (!isLoading) loadCartWithDetails();
  }, [isLoading]);

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Mon Panier</Title>
        <ClearCart onClick={handleClear}>Vider le panier</ClearCart>

        <CartWrapper>
          <CartContainer>
            {itemList.length > 0 ? (
              itemList.map((item, index) => (
                <CartItem key={index}>
                  <LazyImage width={"100px"} height={"100px"} src={item.listing.product.images[0]} alt={item.listing.product.name} />
                  <ItemInfo>
                    <h3>{item.listing.product.name}</h3>
                    <p>{item.listing.product.price} €</p>
                  </ItemInfo>
                  <DeleteIcon onClick={() => handleDelete(item.listing.id_listing)}>
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
