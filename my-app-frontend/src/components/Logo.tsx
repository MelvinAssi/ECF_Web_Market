import styled from "styled-components";

const Logo = () =>{
    const LogoContainer = styled.div`
       
      display:flex;
      flex-direction: row; 
      align-items: center; 
      border: 2px solid var(--color3);
      border-radius: 6px;
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

    return(
        <LogoContainer>
            <LogoLeft>
                <LogoText>TechReuse</LogoText>
            </LogoLeft>
            <LogoRight>
                <LogoText>Market</LogoText>
            </LogoRight>

        </LogoContainer>
    )


}
 export default Logo;