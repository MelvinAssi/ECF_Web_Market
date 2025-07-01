import styled from "styled-components";
import Header from "../components/Header";  
import { DropdownMenu } from "../components/DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;
const IconBackground = styled.div`
    width:32px;
    height:32px;
    border-radius: 50%;
    background-color:var(--color5);
    display:flex;
    align-items:center;
    justify-content:center;
        
`;


const HomePage = () => {
    const navigate = useNavigate()
    return (      
      <>
        <Header/>
        <PageContainer>          
          <h1>Home</h1>
                                      <DropdownMenu
                                trigger={
                                    <IconBackground>
                                        <FontAwesomeIcon size="1x" icon="user" color="#34374C" />
                                    </IconBackground>
                                }
                                items={[
                                    { label: "Se connecter", onClick: () => navigate("/signin") },
                                    { label: "S'inscrire", onClick: () => navigate("/signup") },
                                ]}
                            />  
        </PageContainer>      
      </>
    );
  };

  export default HomePage;