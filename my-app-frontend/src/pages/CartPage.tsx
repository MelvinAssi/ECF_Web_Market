import styled from "styled-components";
import Header from "../components/Header";  
import { useEffect, useState } from "react";
import axios from "../services/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "../components/Button";

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;

const CartContainer =styled.div`
  display:flex;
  flex-direction: column;
`;



const CartPage = () => {
    const {isLoading}=useAuthContext()
    const [cart,setCart] = useState([]);
    const [itemList,setItemList] =useState<any>([])


    const loadCartWithDetails = async () => {
      try {
        const response = await axios.get('/cart');
        setCart(response.data);
         
        const productDetails = await Promise.all(
          response.data.listings.listings.map(async (p: any) => {
            const res = await axios.get(`/listing/${p.id_listing}`);
            return {
              quantity: p.quantity,
              listing: res.data
            };
          })
        );

        setItemList(productDetails);
      } catch (error: any) {
        console.error('loadCartWithDetails error:', error.response?.data?.message || error.message);
      }
    };

    const handleClick = async() =>{
      try {
        const response = await axios.post('/orders');
         
      } catch (error: any) {
        console.error('order error:', error.response?.data?.message || error.message);
      }
    }

    useEffect(() => {
      if (!isLoading) loadCartWithDetails();
    }, [isLoading]);

    return (      
      <>
        <Header/>
        <PageContainer>          
          <h1>Mon Panier</h1>
          <div style={{display:"flex",width:'100%',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"}}>
            <CartContainer>
              {itemList.length > 0 ? (
                  itemList.map((item, index) => (
                    <div key={index} style={{display:"flex", border: '1px solid var(--color4)', padding: '10px', margin: '10px' }}>
                      <h3>{item.listing.product.name}</h3>
                      <p> {item.listing.product.price} €</p>
                      <img src={item.listing.product.images[0]} alt={item.listing.product.name} width="100" />
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--color5)' }}>Votre panier est vide</p>
                )}
            </CartContainer>
            <div style={{display:"flex" ,flexDirection:"column",backgroundColor:'var(--color5)',padding:"10px", gap:"10px"}}>
              <p>Total : {}</p>
              <Button onClick={handleClick} text="Passer la commande"></Button>
            </div>
          </div>


        </PageContainer>      
      </>
    );
  };

  export default CartPage;