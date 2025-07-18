import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = styled.div`
    
    display:flex;
    flex-direction: row; 
    align-items: center; 
    border: 2px solid var(--color3);
    border-radius: 6px;
    cursor: pointer;
`;

const LogoLeft = styled.div`
    padding:4px 3px;
    display:flex;
    flex-direction: column; 
    align-items: center; 
    background-color: var(--color3);
    color: var(--color5);
`;
const LogoRight = styled.div`
    padding:4px 3px;
    display:flex;
    flex-direction: column; 
    align-items: center; 
    background-color: var(--color5);
    color: var(--color3);
`;
const LogoText = styled.p`
    font-size:22px;
    
    font-weight: bold;
    @media (max-width: 768px) {
        font-size:18px;
    }
`;


const Logo = () =>{


    const navigate = useNavigate()
    return(
        <LogoContainer onClick={()=>(navigate('/'))}>
            <LogoLeft>
                <LogoText style={{color:"var(--color5)"}}>TechReuse</LogoText>
            </LogoLeft>
            <LogoRight>
                <LogoText style={{color:"var(--color3)"}}>Market</LogoText>
            </LogoRight>
        </LogoContainer>
    )


}
 export default Logo;