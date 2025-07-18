import styled from "styled-components";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Newsletter from "./Newsletter";
import { useState } from "react";
import CookiePreferences from "./CookiePreferences";

// Containers principaux
const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color1);
  color: var(--color5);
`;

const Footer1 = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`;

const Footer2 = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-evenly;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }



  a {
    text-decoration: none;
    color: var(--color5);

    &:hover {
      color: var(--color3);
    }
  }
`;

const Footer3 = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: var(--color1);
`;

const H3Styled = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color3);
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 70%;
    height: 70%;
    color: var(--color5);
  }
`;

const SocialIcons = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Composant principal
const Footer = () => {
  const [showCookies, setShowCookies] = useState(false);
  return (
    <FooterContainer>
      <Footer1>
        <Logo />
        <h3>Une seconde vie pour votre technologie.</h3>
      </Footer1>

      <Footer2>
        <div>
          <H3Styled>Navigation</H3Styled>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalog">Catalogue</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/signin">S’authentifier</Link></li>
          </ul>
        </div>

        <div>
          <H3Styled>Légal</H3Styled>
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/cgv">Conditions générales de vente</Link></li>
            <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
            <li><p onClick={() => setShowCookies(true)}>Gérer mes cookies</p></li>
          </ul>
        </div>

        <div>
          <H3Styled>Newsletter</H3Styled>
          <Newsletter />
        </div>

        <div>
          <H3Styled>Réseaux sociaux</H3Styled>
          <SocialIcons>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IconWrapper>
                  <FontAwesomeIcon icon={faFacebookF} />
                </IconWrapper>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconWrapper>
                  <FontAwesomeIcon icon={faInstagram} />
                </IconWrapper>
              </a>
            </li>
            <li>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X (ancien Twitter)">
                <IconWrapper>
                  <FontAwesomeIcon icon={faXTwitter} />
                </IconWrapper>
              </a>
            </li>
          </SocialIcons>
        </div>
      </Footer2>

      <Footer3>
        <p>© 2025 Tous droits réservés – TechReuse Market</p>
      </Footer3>
      {showCookies && <CookiePreferences onClose={() => setShowCookies(false)} />}

    </FooterContainer>
    
  );
};

export default Footer;
