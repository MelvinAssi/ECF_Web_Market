import styled from "styled-components";
import Header from "../../components/Header";
import { sections } from "./section";
const { Hero, PopularCategories, PopularItems, Reviews, AboutUs } = sections;


const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
`;

const HomePage = () => {

  return (
    <>
      <Header />
      <PageContainer>
        <Hero/>
        <PopularCategories />
        <PopularItems/>
        <Reviews />
        <AboutUs />
      </PageContainer>
    </>
  );
};

export default HomePage;
