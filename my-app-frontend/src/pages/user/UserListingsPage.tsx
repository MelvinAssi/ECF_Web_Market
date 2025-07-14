import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";
import Button from "../../components/Button";
import Item, { ItemState } from "../../components/Item";
import AddListingModal from "../../components/user/AddListingModal"

interface Ad {
  id: string;
  name: string;
  description: string;
  price: string;
  state: ItemState;
  category: string;
  image?: string;
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--color2);
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;

const AdsSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5); // #F6F6F6
  border-radius: 6px;
`;
const AdsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;
const AdActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
`;
const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--color4);

  &:last-child {
    border-bottom: none;
  }

  p {
    color: var(--color1);
    margin: 0;
  }
`;

const UserListingsPage = () => {
  const { user } = useAuthContext();
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const fetchData = async () => {
    try {
      const adsResponse = await axios.get("/listing/user");
      setAds(adsResponse.data || []);
      console.log(adsResponse.data[0].product.images[0] )
    } catch (err) {
      setError("Erreur lors du chargement des données");
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <UserLayout>
      <PageWrapper>
        <AdsSection>
          <PageTitle>Mes Annonces</PageTitle>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button text="Ajouter une annonce" variant="type3" width="300px" type="button" onClick={() =>(setIsModalOpen(true))} />
          {ads.length > 0 ? (
            <AdsGrid>
              {ads.map((ad) => (
                <div key={ad.id}>
                  <Item id = {ad.id} variant="type2" img={ad.product.images[0]} name={ad.product.name} description={ad.product.description} price={ad.product.price} condition={ad.product.condition} verification={ad.product.verification_status} />
                  <AdActions>
                    <Button text="Modifier" variant="type3" width="100px" type="button" onClick={() => ("")} />
                    <Button text="Supprimer" variant="type2" width="50px" type="button" onClick={() => ("")} />
                  </AdActions>
                </div>
              ))}
            </AdsGrid>
          ) : (
            <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>Aucune annonce disponible.</p>
          )}
        </AdsSection>
        <AddListingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              fetchData(); 
            }}
          />
      </PageWrapper>
    </UserLayout>
  );
};

export default UserListingsPage;
