import styled from "styled-components";
import Header from "../components/Header";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aboutUs from "../assets/img/HomePage/about_us.webp";
import { category1, category2, category3, category4 ,offer1,offer2,offer3} from '../assets/img/HomePage';
import Review from "../components/Review";
import CategoryItem from "../components/CategoryItem";
import Item from "../components/Item";
import { useEffect, useState } from "react";
import axios from "../services/axios";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 0; /* Espace haut et bas */
  width: 100%;
  height: auto;
  position: relative;
  background-color: var(--color2); /* ou autre couleur d’arrière-plan */
`;
const SlideWrapper = styled.div`
  width: 90%;
  max-width: 1298px;
  aspect-ratio: 1298 / 199;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    aspect-ratio: 2 / 1;
  }
`;

const Slide = styled.img<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
`;


const Chevron = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: var(--color1);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: var(--color3);
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 6px;
  }
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


const StyledImage = styled.img`
  width: 400px;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;


const HomePage = () => {

  const [categoryIds, setCategoryIds] = useState<Record<string, string>>({});
  const [itemList, setItemList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [offer1, offer2, offer3];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
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
    fetchItems()
  }, []);
  const fetchItems = async () => {
    try {
      const response = await axios.get("/listing");
      setItemList(response.data);
    } catch (error: any) {
      console.error("fetchItems error:", error.response?.data?.message || error.message);
    }
  };

    
    return (      
      <>
        <Header/>
        <PageContainer>          
        <HeroSection>
          <Chevron icon={faChevronLeft} className="left" onClick={prevSlide} />
          <SlideWrapper>
            
            {carouselImages.map((img, index) => (
              <Slide
                key={index}
                src={img}
                alt={`Offre ${index + 1}`}
                $active={index === currentSlide}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            ))}
            
          </SlideWrapper>
          <Chevron icon={faChevronRight} className="right" onClick={nextSlide} />
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
              {[...itemList]
                .sort(() => 0.5 - Math.random()) 
                .slice(0, 4)                   
                .map(item => (
                  <Item
                    variant="type2"
                    key={item.id_listing}
                    id={item.id_listing}
                    name={item.product.name}
                    description={item.product.description}
                    img={item.product.images?.[0]}
                    price={item.product.price}
                    condition={item.product.condition}
                    verification={item.product.verification_status}
                  />
              ))}
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
                <StyledImage
                  src={aboutUs}
                  alt="À propos de TechReuse Market"
                  loading="eager"
                  fetchPriority="high"
                />
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