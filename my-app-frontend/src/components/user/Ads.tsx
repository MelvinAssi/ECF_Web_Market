import styled from "styled-components";
import Button from "../Button";
import Item, { ItemState } from "../Item";

// Interface
interface Ad {
  id: string;
  name: string;
  description: string;
  price: string;
  state: ItemState;
  category: string;
  image?: string;
}

// Styled Components
const AdsSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5); // #F6F6F6
  border-radius: 6px;
`;

const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }
`;

const AdActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
`;

const Ads = ({ ads, handleDeleteAd, navigate }: { ads: Ad[]; handleDeleteAd: (adId: string) => Promise<void>; navigate: (path: string) => void }) => (
  <AdsSection>
    <h3 style={{ fontFamily: "Cormorant, serif", color: "#34374C" }}>Mes Annonces</h3>
    <Button text="Ajouter une annonce" variant="type3" width="300px" type="button" onClick={() => navigate("/add-ad")} />
    {ads.length > 0 ? (
      <AdsGrid>
        {ads.map((ad) => (
          <div key={ad.id}>
            <Item name={ad.name} description={ad.description} img={ad.image || "/img/placeholder.jpg"} price={ad.price} state={ad.state as ItemState} />
            <AdActions>
              <Button text="Modifier" variant="type3" width="100px" type="button" onClick={() => navigate(`/edit-ad/${ad.id}`)} />
              <Button text="Supprimer" variant="type2" width="50px" type="button" onClick={() => handleDeleteAd(ad.id)} />
            </AdActions>
          </div>
        ))}
      </AdsGrid>
    ) : (
      <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>Aucune annonce disponible.</p>
    )}
  </AdsSection>
);

export default Ads;