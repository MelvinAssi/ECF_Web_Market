import styled from "styled-components";
import Header from "../components/Header";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aboutUs from "../assets/img/HomePage/about_us.jpg";
import { category1, category2, category3, category4 } from '../assets/img/HomePage';
import Review from "../components/Review";
import CategoryItem from "../components/CategoryItem";
import Item from "../components/Item";
import { useEffect, useState } from "react";
import axios from "../services/axios";

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;

const HeroSection = styled.section`
    min-height: 50vh;
    width: 100%;
`;
const HeroContent = styled.div`
  height: 100%;
  width: 100%;
  background: url('/img/hero.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color1);
  font-size: 2rem;
`;
const PopularCategorySection = styled.section`
    min-height: 50vh;
    width: 100%;
`;
const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const PopularCategoryItem = styled.section`
    min-height: 50vh;
    width: 100%;
`;
const ReviewSection = styled.section`
    min-height: 50vh;
    width: 100%;
    padding: 10px;
    color:var(--color4);
`;

const AboutUsSection = styled.section`
    min-height: 50vh;
    width: 100%;
    background-color :var(--color4  );
    color :var(--color5);
    display:flex;
    flex-direction: column;
    align-items: center;
`;
const AboutUsContent = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AboutUsText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Icon = styled(FontAwesomeIcon)`
    height: 28px;
    width: 28px;
    color:var(--color3);
    padding:5px;
    text-align: center;
`;
const AboutUsLeft=styled.div`
  display: flex;
  width:50%;
   height:auto;
   align-items: center;
   justify-content: center;
`;

type AboutUsLeft_imgProps = {
  image: string;
};

const AboutUsLeft_img = styled.div<AboutUsLeft_imgProps>`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 400px;
  height: 300px;
  border-radius: 6px;
`;


const HomePage = () => {
  const [categoryIds, setCategoryIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const names = ["Ordinateurs portables", "Smartphones", "Accessoires", "Composants PC"];
        const results = await Promise.all(names.map(name => 
          axios.get(`/category/${encodeURIComponent(name)}`).then(res => ({ name, id: res.data.id_category }))
        ));
        
        const mapped: Record<string, string> = {};
        results.forEach(({ name, id }) => {
          mapped[name] = id;
        });

        setCategoryIds(mapped);
      } catch (error: any) {
        console.error("Erreur lors du chargement des catégories populaires :", error.response?.data?.message || error.message);
      }
    };

    fetchPopularCategories();
  }, []);

    
    return (      
      <>
        <Header/>
        <PageContainer>          
          <HeroSection>
            <HeroContent>Bienvenue sur TechReuse Market</HeroContent>
          </HeroSection>
          <PopularCategorySection>
            <h2>Catégories populaires</h2>
            <CategoryGrid>
              {categoryIds["Ordinateurs portables"] && (
                <CategoryItem
                  id_category={categoryIds["Ordinateurs portables"]}
                  text="Ordinateurs portables"
                  img={category1}
                />
              )}
              {categoryIds["Smartphones"] && (
                <CategoryItem
                  id_category={categoryIds["Smartphones"]}
                  text="Smartphones"
                  img={category2}
                />
              )}
              {categoryIds["Accessoires"] && (
                <CategoryItem
                  id_category={categoryIds["Accessoires"]}
                  text="Accessoires"
                  img={category3}
                />
              )}
              {categoryIds["Composants PC"] && (
                <CategoryItem
                  id_category={categoryIds["Composants PC"]}
                  text="Composants PC"
                  img={category4}
                />
              )}
            </CategoryGrid>

          </PopularCategorySection>

          <PopularCategoryItem>
            <h2>Produits populaires</h2>
            <CategoryGrid>
              <Item name="SSD Samsung 860 EVO" description="1 To \n 550 Mo/s" img={aboutUs} price="79€" state="Occasion" />
              <Item name="SSD Samsung 860 EVO" description="1 To \n 550 Mo/s" img={aboutUs} price="79€" state="Occasion" />
              <Item name="SSD Samsung 860 EVO" description="1 To \n 550 Mo/s" img={aboutUs} price="79€" state="Occasion" />
              <Item name="SSD Samsung 860 EVO" description="1 To \n 550 Mo/s" img={aboutUs} price="79€" state="Occasion" />
            </CategoryGrid>
          </PopularCategoryItem>
          <ReviewSection>
            <h2>Avis :</h2>
            <Review/>
          </ReviewSection>
          <AboutUsSection>
            <h2 style={{ padding: "10px" }}>
              TechReuse Market – Donnons une seconde vie à la technologie
            </h2>
            <AboutUsContent>
              <AboutUsLeft>
                <AboutUsLeft_img image={aboutUs} />
              </AboutUsLeft>
              <AboutUsText>
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
                <p>
                  Rejoignez notre communauté d’acheteurs et de vendeurs engagés. Achetez malin, achetez durable.
                </p>
              </AboutUsText>
            </AboutUsContent>
</AboutUsSection>

        </PageContainer>      
      </>
    );
  };

  export default HomePage;