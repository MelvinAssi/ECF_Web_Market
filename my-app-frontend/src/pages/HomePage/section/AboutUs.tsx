import styled from "styled-components";
import aboutUs from "../../../assets/img/HomePage/about_us.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  background-color: var(--color4);
  
  color: var(--color5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  gap: 20px;
  justify-content: center;
  @media (max-width: 768px) { flex-direction: column; align-items: center; }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  @media (max-width: 768px) { width: 90%; }
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  height: auto;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
  @media (max-width: 768px) { width: 100%; height: auto; }
`;

const Icon = styled(FontAwesomeIcon)`
  height: 28px;
  width: 28px;
  color: var(--color3);
  padding: 5px;
  text-align: center;
`;

const AboutUs = () => (
  <Section>
    <h2 style={{ padding: "10px" }}>TechReuse Market – Donnons une seconde vie à la technologie</h2>
    <Content>
      <Left>
        <StyledImage src={aboutUs} alt="À propos de TechReuse Market" />
      </Left>
      <Text>
        <p>Chez TechReuse Market, nous croyons que la technologie mérite une seconde chance...</p>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon icon={"leaf"} />
            <p>Écologique : Réduction des déchets électroniques, revalorisation</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon icon={"shield"} />
            <p>Fiable : Produits testés, vendeurs évalués, paiements sécurisés</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon icon={"euro-sign"} />
            <p>Abordable : Jusqu’à -60 % par rapport au neuf, sans compromis</p>
          </div>
        </div>
        <p>Rejoignez notre communauté d’acheteurs et de vendeurs engagés. Achetez malin, achetez durable.</p>
      </Text>
    </Content>
  </Section>
);

export default AboutUs;
