import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axios";
import Button from "../components/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";

// Wrapper principal
const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 20px;
`;

// Conteneur général du produit
const ProductWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  background-color: var(--color5);
  padding: 20px;
  border-radius: 6px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

// Image principale
const MainImageProduct = styled.div<{ image: string }>`
  background-color: var(--color4);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
  width: 400px;

    @media (max-width: 768px) {
      width: 100%;
      height: 400px;
  }
`;

const OtherImageProduct = styled.div<{ image: string }>`
  background-color: var(--color4);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 60px;
  width: 60px;
  border-radius: 4px;

  @media (max-width: 768px) {
    height: 50px;
    width: 50px;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OtherImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    max-width: 100%;
    padding-bottom: 5px;
  }
`;

const InformationProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;

  h1 {
    color: var(--color4);
    margin-bottom: 10px;
  }

  p {
    color: var(--color1);
  }
`;

const BuyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color1);
  padding: 20px;
  border-radius: 6px;
  height: fit-content;
  gap: 10px;
  min-width: 250px;

  h2 {
    color: var(--color3);
    margin: 0;
  }

  p {
    color: var(--color5);
    font-size: 14px;
  }
`;
export type ConditionState = 'Neuf' | 'Bon état' | 'Passable';
export type VerificationState = 'Reconditionné' | 'Occasion';

const ProductPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { checkPresenceInCart, addToCart } = useCartContext();
  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`/listing/${id}`);
      setItem(response.data);
      console.log(response.data)
      setSelectedImage(response.data.product.images?.[0] || "");
    } catch (error: any) {
      console.error('fetchItem error:', error.response?.data?.message || error.message);
    }
  };
  /*
    const addToCart = async () => {
      try {
        const response =await axios.post(`/cart/add`, {
          listingId: item.id_listing,
          quantity: 1,
        });console.log('addToCart response:', response.data);
      } catch (error: any) {
        console.error('addToCart error:', error.response?.data?.message || error.message);
      }
    };
  */
  const buyItem = async () => {
    try {
      await axios.post(`/cart/add`, {
        listingId: item.id_listing,
        quantity: 1,
      });
      navigate('/cart');
    } catch (error: any) {
      console.error('buyItem error:', error.response?.data?.message || error.message);
    }
  };
  const formatVerification = (value: string): VerificationState => {
    switch (value) {
      case 'READY_TO_SELL':
        return 'Occasion';
      case 'RECONDITIONED':
        return 'Reconditionné';
      default:
        return 'Occasion';
    }
  };

  const formatCondition = (value: string): ConditionState => {
    switch (value) {
      case 'NEW':
        return 'Neuf';
      case 'GOOD':
        return 'Bon état';
      case 'USED':
        return 'Passable';
      default:
        return 'Bon état';
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        {item && (
          <ProductWrapper>
            <ProductContainer>
              <ImagesContainer>
                <MainImageProduct image={selectedImage} />
                <OtherImagesContainer>
                  {item?.product?.images?.map((img: string, index: number) => (
                    <OtherImageProduct
                      key={index}
                      image={img}
                      onClick={() => setSelectedImage(img)}
                      aria-label={`Miniature ${index + 1}`}
                      style={{
                        cursor: "pointer",
                        border: selectedImage === img ? "2px solid var(--color3)" : "none",
                      }}
                    />
                  ))}
                </OtherImagesContainer>
              </ImagesContainer>
              <InformationProduct>
                <h1>{item.product.name}</h1>
                <p>{item.product.description}</p>
                <p>État : {formatCondition(item.product.condition)}</p>
                <p>Vérification : {formatVerification(item.product.verification)}</p>
              </InformationProduct>
            </ProductContainer>

            <BuyContainer>
              <h2>{item.product.price} €</h2>
              <p>Vendu par {item.seller.name} {item.seller.firstname}</p>
              {item.status == "ONLINE" && (
                <>
                  {user ? (
                    <>
                      {!checkPresenceInCart(item.id_listing) ? (
                        <>
                          <Button text="Ajouter au panier" variant="type1" width="auto" onClick={() => addToCart(item.id_listing, 1)} />
                          <Button text="Acheter cet article" variant="type2" width="auto" onClick={buyItem} />
                        </>
                      ) : (
                        <Button text="Dèja dans le panier" variant="type1" width="auto" onClick={() => navigate('/cart')} />
                      )}

                    </>
                  ) : (
                    <Button text="Se Connecter" variant="type1" width="auto" onClick={() => navigate('/cart')} />
                  )}
                </>
              )}
            </BuyContainer>
          </ProductWrapper>
        )}
      </PageContainer>
    </>
  );
};

export default ProductPage;
