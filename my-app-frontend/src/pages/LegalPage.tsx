import React, { type JSX } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const PageContainer = styled.main`
  min-height: 100vh;
  padding: 40px 20px;
  background-color: var(--color2);
  color: var(--color1);
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Title = styled.h1`
  color: var(--color4);
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-top: 30px;
  color: var(--color3);
`;

const LegalPage = ({ title, content }: { title: string; content: JSX.Element }) => (
  <>
    <Header reduce={true} />
    <PageContainer>
      <Title>{title}</Title>
      {content}
    </PageContainer>
  </>
);

// Mentions Légales
export const LegalNotice = () => (
  <LegalPage
    title="Mentions légales"
    content={
      <>
        <p><strong>Nom de l'entreprise :</strong> TechReuse Market</p>
        <p><strong>Responsable de publication :</strong> Melvin Assi</p>
        <p><strong>Hébergeur :</strong> Netlify, Inc.</p>
        <p><strong>Contact :</strong> contact@techreuse.com</p>
        <Subtitle>Propriété intellectuelle</Subtitle>
        <p>Tous les contenus de ce site (textes, images, logos) sont la propriété exclusive de TechReuse Market, sauf mention contraire.</p>
      </>
    }
  />
);



export const TermsAndConditions = () => (
  <LegalPage
    title="Conditions générales de vente"
    content={
      <>
        <Subtitle>1. Objet</Subtitle>
        <p>Les présentes conditions régissent les ventes sur la plateforme TechReuse Market.</p>

        <Subtitle>2. Commandes</Subtitle>
        <p>Les commandes sont validées après réception du paiement.</p>

        <Subtitle>3. Livraison</Subtitle>
        <p>Les délais varient selon le vendeur. Les frais de livraison sont indiqués avant validation de la commande.</p>

        <Subtitle>4. Retour et remboursement</Subtitle>
        <p>Conformément à la loi, l'acheteur dispose de 14 jours pour exercer son droit de rétractation.</p>
      </>
    }
  />
);


export const PrivacyPolicy = () => (
  <LegalPage
    title="Politique de confidentialité"
    content={
      <>
        <Subtitle>Collecte de données</Subtitle>
        <p>Nous collectons uniquement les données nécessaires à la bonne exécution de nos services.</p>

        <Subtitle>Utilisation</Subtitle>
        <p>Vos données sont utilisées pour la gestion des commandes, la relation client et l'amélioration du service.</p>

        <Subtitle>Stockage</Subtitle>
        <p>Les données sont stockées de manière sécurisée et conformément à la réglementation européenne (RGPD).</p>

        <Subtitle>Vos droits</Subtitle>
        <p>Vous pouvez accéder, modifier ou supprimer vos données sur simple demande à contact@techreuse.com.</p>
      </>
    }
  />
);

export default LegalNotice;
