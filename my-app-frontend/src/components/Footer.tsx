import styled from "styled-components";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Newsletter from "./Newsletter";

const FooterContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: column; 
    align-items: center; 
    background-color:var(--color1);
    color:var(--color5);
`;
const Footer1 = styled.div`
    width:100%;
    display:flex;
    flex-direction: row; 
    align-items: center; 
    padding: 30px;
    gap:30px;
`;
const Footer2 = styled.div`
    width:100%;
    padding: 20px;
    display:flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: space-evenly;
    ul{
        gap:15px;
        list-style: none;
    }
    a{
        text-decoration: none;
        color: var(--color5);
    }
`;
const IconWrapper = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color3);
    border-radius: 50%;
    svg {
        width: 70%;
        height: 70%;
    }
`;
const Footer3 = styled.div`
    width:100%;
    display:flex;
    align-items: center; 
    justify-content: center;
    padding: 10px;
`;
const H3Styled = styled.h3`
    font-weight:bold;
`;





const Footer = () => {



    return (    
      <FooterContainer>
        <Footer1>
            <Logo/>
            <h3>Une seconde vie pour votre technologie.</h3>
        </Footer1>  
        <Footer2>
            <div>
                <H3Styled>Navigation</H3Styled>
                <ul style={{display:'flex',flexDirection:'column'}}>
                    <li><Link to="/"><p>Accueil</p></Link></li>
                    <li><Link to="/"><p>Catalogue</p></Link></li>
                    <li><Link to="/contact"><p>Contact</p></Link></li>
                    <li><Link to="/signin"><p>S’authentifier</p></Link></li>
                </ul>                
            </div>
            <div>
                <H3Styled>Légal</H3Styled>
                <ul style={{display:'flex',flexDirection:'column'}}>
                    <li><Link to="/"><p>Mentions légales</p></Link></li>
                    <li><Link to="/"><p>Conditions générales de vente</p></Link></li>
                    <li><Link to="/"><p>Politique de confidentialité</p></Link></li>
                    <li><Link to="/"><p>Gérer mes cookies</p></Link></li>
                </ul>                
            </div>
            <div>
                <H3Styled>Newsletter</H3Styled>
                <Newsletter></Newsletter>
            </div>
            <div>
                <H3Styled>Réseaux sociaux</H3Styled>
                <ul style={{display:'flex'}}>
                    <li>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <IconWrapper>
                            <FontAwesomeIcon icon={faFacebookF} color="#F6F6F6" />
                        </IconWrapper>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <IconWrapper>
                                <FontAwesomeIcon icon={faInstagram} color="#F6F6F6" />
                            </IconWrapper>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                            <IconWrapper>
                                <FontAwesomeIcon icon={faXTwitter} color="#F6F6F6"/>
                            </IconWrapper>
                        </a>
                    </li>
                </ul>          
            </div>
            
        </Footer2>
        <Footer3>
            <p>Copyright © 2025 Tous droits réservés TechReuse Market</p>
        </Footer3>     
        
      </FooterContainer> 

    );
  };

  export default Footer;