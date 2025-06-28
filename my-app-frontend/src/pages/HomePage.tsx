import styled from "styled-components";


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :var(--color2);
`;



const HomePage = () => {
    return (      
      <PageContainer>
        <h1>Home</h1>
      </PageContainer>
    );
  };

  export default HomePage;