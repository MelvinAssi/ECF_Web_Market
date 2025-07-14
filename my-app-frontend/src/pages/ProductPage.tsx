import styled from "styled-components";
import Header from "../components/Header";  
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axios";
import Button from "../components/Button";

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
    padding:10px;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color : var(--color5);
    padding: 20px;
    border-radius: 6px;
`;
const ImagesContainer = styled.div`
    display:flex;
    flex-direction : row;
    padding:20px;
    gap:10px;
`;
const OtherImagesContainer = styled.div`
    display:flex;
    flex-direction : column;
    gap:10px;
`;
const MainImageProduct =styled.div<{ image: string }>`
    background-color: var(--color4);
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
    width: 400px;
`;
const OtherImageProduct =styled.div<{ image: string }>`
    background-color: var(--color4);
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 50px;
    width: 50px;
`;
const InformationProduct = styled.div`
    display:flex;
    flex-direction : column;
    gap:10px;
`;

const BuyContainer= styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
    background-color : var(--color1);
    padding: 20px;
    gap:10px;
    border-radius: 6px;
`;

const ProductPage = () => {
    const {id} = useParams();
    const [item, setItem] = useState<any>(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchItems();
    }, [id]);

    const fetchItems = async()=>{
        try {
            const response = await axios.get(`/listing/${id}`);
            setItem(response.data)  
            console.log(response.data)
        } catch (error: any) {
            console.error('fetchItem error:', error.response?.data?.message || error.message);
            throw error;
        }
    };    
    const addToCart = async() =>{
        try {
            await axios.post(`/cart/add`,
                {
                    listingId:item.id_listing,
                    quantity:1,
                });
        } catch (error: any) {
            console.error('fetchItem error:', error.response?.data?.message || error.message);
            throw error;
        }
    }
    const buyItem = async() =>{
        try {
            await axios.post(`/cart/add`,
                {
                    listingId:item.id_listing,
                    quantity:1,
                });
            navigate('/cart')
        } catch (error: any) {
            console.error('fetchItem error:', error.response?.data?.message || error.message);
            throw error;
        }
    }    
    return (      
      <>
      
        <Header/>
        <PageContainer>          
            <div style={{display:"flex", gap:'20px'}}>
                <ProductContainer >            
                    <ImagesContainer>
                        <MainImageProduct image={item?.product?.images?.[0] || ''} />
                        <OtherImagesContainer>
                            {item?.product?.images?.slice(1, 4).map((img:string, index:string) => (
                                <OtherImageProduct key={index} image={img}/>
                            ))}
                        </OtherImagesContainer>
                    </ImagesContainer>
                    <InformationProduct>
                        <h1 style={{color:"var(--color4)"}}>{item?.product.name}</h1>
                        <p style={{color:"var(--color1)"}}>{item?.product.description}</p>
                        <p style={{color:"var(--color1)"}}>{item?.product.condition}</p>
                    </InformationProduct>
                </ProductContainer>
                <BuyContainer>
                    <h2 style={{color:"var(--color3)"}}>{item?.product.price} €</h2>
                    <p style={{color:"var(--color5)"}}>Vendu par {item?.seller.name} {item?.seller.firstname}</p>
                    <Button text="Ajouter au panier" variant="type1" onClick={addToCart}/>
                    <Button text="Acheter cette article" variant="type2" onClick={buyItem}/>
                </BuyContainer>            
            </div>

        </PageContainer>      
      </>
    );
  };

  export default ProductPage;