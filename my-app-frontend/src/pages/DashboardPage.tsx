import styled from "styled-components";
import Header from "../components/Header";  

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;



const DashboardPage = () => {
    
    return (      
      <>
        <Header/>
        <PageContainer>          
          <h1>DashboardPage</h1>

        </PageContainer>      
      </>
    );
  };

  export default DashboardPage;