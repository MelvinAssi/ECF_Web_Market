import { type JSX } from "react";
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

const Small = styled.small`
  display:block;
  margin-top:8px;
  color: var(--color4);
`;

// Composant générique
const LegalPage = ({ title, content }: { title: string; content: JSX.Element }) => (
  <>
    <Header reduce={true} />
    <PageContainer>
      <Title>{title}</Title>
      {content}
      <Small>Dernière mise à jour : 23 Novembre 2025</Small>
      {/* Ajouts de liens vers les documents du projet
      <Small>
        Rapport du projet (fichier) : <a href="/legal/Dossier Projet.pdf" target="_blank" rel="noreferrer">/legal/Dossier Projet.pdf</a>
      </Small>
      <Small>
        <a href="https://github.com/MelvinAssi/ECF_Web_Market/blob/main/Docs/CHARTE_GRAPHIQUE.md" target="_blank">
          Voir la charte graphique
        </a>
      </Small>
       */}
      
    </PageContainer>
  </>
);

// --- 1) Mentions légales (version RGPD-friendly) ---
export const LegalNotice = () => (
  <LegalPage
    title="Mentions légales"
    content={
      <>
        <p><strong>Nom du projet :</strong> TechReuse Market (projet fictif)</p>
        <p><strong>Responsable de publication :</strong> Melvin Assi</p>
        <p><strong>Contact :</strong> <a href="mailto:melvinassi.pro@gmail.com">melvinassi.pro@gmail.com</a></p>
        <p><strong>Statut :</strong> Projet fictif — pas d'immatriculation commerciale (pas de SIREN/SIRET).</p>

        <Subtitle>Hébergeur</Subtitle>
        <p>Les ressources statiques peuvent être hébergées sur Netlify / Cloudflare / Railway selon le déploiement. Le service d'hébergement est choisi par l'équipe de développement et peut varier.</p>

        <Subtitle>Propriété intellectuelle</Subtitle>
        <p>Tous les contenus proposés sur ce site (textes, images, logos, mises en page, codes source) sont la propriété exclusive du projet TechReuse Market ou de ses partenaires et ne peuvent être reproduits sans autorisation.</p>

        <Subtitle>Limitation de responsabilité</Subtitle>
        <p>Le projet TechReuse Market est fourni « tel quel ». En tant que projet fictif, il est fourni à des fins de démonstration et n’engage pas la responsabilité d’un opérateur commercial. L'utilisation des informations disponibles est faite sous la responsabilité de l'utilisateur.</p>
      </>
    }
  />
);

// --- 2) Conditions Générales de Vente (simplifiées + RGPD-aware pour marketplace fictive) ---
export const TermsAndConditions = () => (
  <LegalPage
    title="Conditions générales de vente (CGV)"
    content={
      <>
        <Subtitle>1. Objet</Subtitle>
        <p>Ces conditions s'appliquent aux transactions réalisées via la plateforme TechReuse Market (projet fictif). Elles décrivent les règles applicables entre l'acheteur et le vendeur dans le cadre d'une place de marché.</p>

        <Subtitle>2. Fonctionnement</Subtitle>
        <p>TechReuse Market met en relation acheteurs et vendeurs. TechReuse Market n'est pas le vendeur des biens mais la plateforme facilitant la transaction (projet fictif).</p>

        <Subtitle>3. Commande et paiement</Subtitle>
        <p>La commande est effective à réception du paiement via le prestataire de paiement intégré (Stripe Connect en environnement de test). Les frais de traitement (Stripe) et la commission de la plateforme sont clairement indiqués avant validation.</p>

        <Subtitle>4. Livraison</Subtitle>
        <p>Les modalités de livraison (délais, frais) sont définies par chaque vendeur dans la fiche produit.</p>

        <Subtitle>5. Droit de rétractation</Subtitle>
        <p>Conformément à la réglementation en vigueur, l'acheteur dispose, lorsque la loi l'autorise, d'un droit de rétractation de 14 jours à compter de la réception du bien. Exceptions et conditions figurent dans la réglementation applicable.</p>

        <Subtitle>6. Responsabilités</Subtitle>
        <p>Les litiges entre acheteurs et vendeurs sont à traiter entre les parties ; la plateforme may propose des outils d’assistance mais, pour ce projet fictif, n’assume pas de responsabilité commerciale.</p>
      </>
    }
  />
);

// --- 3) Politique de confidentialité (RGPD stricte) ---
export const PrivacyPolicy = () => (
  <LegalPage
    title="Politique de confidentialité (RGPD)"
    content={
      <>
        <p><strong>Responsable du traitement :</strong> Melvin Assi — TechReuse Market (projet fictif)</p>
        <p><strong>Contact DPO / Responsable :</strong> <a href="mailto:melvinassi.pro@gmail.com">melvinassi.pro@gmail.com</a></p>

        <Subtitle>1. Principes et finalités</Subtitle>
        <p>Nous collectons et traitons les données personnelles nécessaires à la fourniture des services suivants : gestion des comptes utilisateurs, gestion des annonces, traitement des commandes et paiements, sécurité et prévention des fraudes, support client.</p>

        <Subtitle>2. Données collectées</Subtitle>
        <ul>
          <li>Identité : nom, prénom, email, adresse postale (si fournie).</li>
          <li>Coordonnées : adresse email, téléphone (optionnel).</li>
          <li>Données de transaction : montant, historique des commandes, identifiants de paiement (fournis par Stripe — tokens, pas les numéros complets de carte).</li>
          <li>Données techniques : adresse IP, identifiants de cookies et logs de connexion.</li>
          <li>Contenu utilisateur : descriptions, images publiées par les vendeurs.</li>
        </ul>

        <Subtitle>3. Base légale des traitements</Subtitle>
        <ul>
          <li>Exécution d'un contrat : traitement nécessaire pour la gestion des commandes et paiements.</li>
          <li>Obligation légale : conservation des données financières pour respecter la réglementation.</li>
          <li>Consentement : pour l'envoi de communications marketing (si activé explicitement par l'utilisateur).</li>
          <li>Intérêt légitime : prévention des fraudes, sécurité de la plateforme.</li>
        </ul>

        <Subtitle>4. Partenaires et sous-traitants</Subtitle>
        <p>Certains traitements sont réalisés par des prestataires externes :</p>
        <ul>
          <li><strong>Stripe</strong> — traitement des paiements et vérification (utilise ses propres sous-traitants). </li>
          <li><strong>Firebase / Cloud Storage</strong> — hébergement d'images et fichiers.</li>
          <li><strong>Plateformes d'hébergement</strong> (Netlify / Railway / Cloudflare) — hébergement du front/back selon le déploiement.</li>
        </ul>
        <p>Ces prestataires sont configurés comme sous-traitants et, si nécessaire, disposent de mécanismes contractuels conformes (clauses de traitement, transferts sûrs).</p>

        <Subtitle>5. Transferts hors UE</Subtitle>
        <p>Selon les prestataires (Stripe, Firebase), certaines données peuvent transiter ou être stockées hors de l'Union européenne. Nous exigeons des garanties contractuelles (clause contractuelle type ou équivalent) pour encadrer ces transferts. Si vous souhaitez plus d’informations, contactez <a href="mailto:melvinassi.pro@gmail.com">melvinassi.pro@gmail.com</a>.</p>

        <Subtitle>6. Durée de conservation</Subtitle>
        <ul>
          <li>Données de comptes : conservées tant que le compte existe, sauf suppression à la demande.</li>
          <li>Données de transaction : conservées pendant 5 ans (exigences comptables et fiscales simulées pour le projet).</li>
          <li>Logs et données techniques : conservées 6 à 24 mois selon le besoin opérationnel.</li>
        </ul>

        <Subtitle>7. Sécurité</Subtitle>
        <p>Des mesures techniques et organisationnelles raisonnables sont mises en place (HTTPS, chiffrement au repos pour les services cloud, permissions strictes). Les paiements sont gérés par Stripe : la plateforme n’enregistre pas les numéros complets de carte.</p>

        <Subtitle>8. Cookies</Subtitle>
        <p>Nous utilisons des cookies nécessaires au fonctionnement du site (authentification, sessions) et des cookies optionnels pour l'analyse et les services tiers (ex : reCAPTCHA, analytics). Vous pouvez gérer vos préférences cookies dans votre navigateur et via les contrôles fournis sur le site.</p>

        <Subtitle>9. Droits des personnes</Subtitle>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>Accès : demander une copie des données vous concernant.</li>
          <li>Rectification : corriger des données inexactes.</li>
          <li>Effacement (« droit à l’oubli ») : suppression de vos données sous réserve des obligations légales de conservation.</li>
          <li>Limitation : demander la limitation du traitement.</li>
          <li>Opposition : vous opposer à certains traitements (ex : prospection commerciale).</li>
          <li>Portabilité : obtenir vos données dans un format structuré, couramment utilisé et lisible par machine.</li>
        </ul>
        <p>Pour exercer ces droits, contactez : <a href="mailto:melvinassi.pro@gmail.com">melvinassi.pro@gmail.com</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>

        <Subtitle>10. Mise à jour</Subtitle>
        <p>La présente politique peut être mise à jour. La date de dernière mise à jour sera indiquée sur cette page. En cas de modification substantielle, les utilisateurs seront informés via le service ou par e-mail si cela est nécessaire.</p>

        <Subtitle>11. Contact</Subtitle>
        <p>Pour toute question relative à la protection des données : <a href="mailto:melvinassi.pro@gmail.com">melvinassi.pro@gmail.com</a>.</p>

        <Subtitle>Remarque</Subtitle>
        <p>Ce site est un projet fictif — certaines obligations réelles (notamment administratives) ont été simulées à des fins pédagogiques. En cas de passage en production réel, il faudra adapter les durées de conservation, mentions CNIL, DPO désigné, et audits contractuels des sous-traitants.</p>
      </>
    }
  />
);

export default LegalNotice;
