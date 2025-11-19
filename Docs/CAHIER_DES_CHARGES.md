# Cahier des Charges – TechReuse Market

**Marketplace web dédiée à la vente et à l’achat de matériel informatique d’occasion**

---

## 1. Introduction

**TechReuse Market** est une plateforme sécurisée, intuitive et moderne permettant :
- L’achat et la vente de matériel informatique d’occasion  
- Une expérience utilisateur fluide pour acheteurs, vendeurs et administrateurs  
- Le respect strict des normes de sécurité (RGPD, HTTPS, protections contre les attaques courantes)  

**Objectif principal** : Favoriser le réemploi de matériel informatique tout en garantant confiance et sécurité.

---

## 2. Besoins Fonctionnels

### 2.1 Page d’Accueil (US 1)
- Présentation visuelle attractive avec produits phares  
- Affichage des catégories principales (ordinateurs, smartphones, accessoires, etc.)  
- Mise en avant des promotions actives  
- Témoignages et avis clients récents  

### 2.2 Menu Principal (US 2)
- Lien vers l’accueil  
- Accès au catalogue complet  
- Connexion / Inscription (acheteur ou vendeur)  
- Page Contact  
- Menu responsive (hamburger sur mobile)

### 2.3 Catalogue des Produits (US 3)
- Grille de produits avec pagination  
- Filtres avancés : catégorie, prix, état, marque, localisation  
- Carte produit contenant :  
  - Nom, image, prix, état (neuf / très bon / bon / usagé), note vendeur  
- Accès rapide à la page détail  
- Gestion des annonces pour les vendeurs connectés

### 2.4 Page Détail Produit (US 4)
- Galerie d’images  
- Description complète + spécifications techniques  
- Prix, état, disponibilité  
- Bouton « Ajouter au panier »  
- Avis clients avec système d’étoiles  
- Profil du vendeur (pseudonyme, note globale, nombre de ventes)

### 2.5 Achat & Vente (US 5)
| Rôle       | Fonctionnalités clés                                                                 |
|------------|--------------------------------------------------------------------------------------|
| Acheteur   | Ajouter au panier → validation → paiement (à implémenter plus tard) → confirmation par email |
| Vendeur    | Créer une annonce : titre, description, photos (max 6), prix, état, catégorie, expédition |
| Système    | Envoi d’emails automatiques (nouvelle annonce, commande reçue)                       |

### 2.6 Espace Administrateur (US 7)
- Tableau de bord avec KPI (ventes, utilisateurs actifs, CA)  
- Gestion des annonces : modération, suppression  
- Gestion des utilisateurs : bannissement, modification rôle  
- Validation / suppression des avis  
- Historique des transactions

### 2.7 Connexion & Gestion de Compte (US 8)
- Inscription / Connexion par email + mot de passe  
- Récupération de mot de passe  
- Espace personnel : mes annonces, mes achats, mes favoris, modification profil

### 2.8 Formulaire de Contact (US 9)
- Champs : sujet, message, email  
- Protection reCAPTCHA v3  
- Envoi vers l’adresse support  
- Confirmation d’envoi à l’utilisateur

### 2.9 Statistiques & Rapports (US 10)
- Produits vendus par catégorie  
- Chiffre d’affaires mensuel  
- Nombre d’utilisateurs inscrits  
- Moyenne des évaluations par vendeur

---

## 3. Exigences de Sécurité (US 6)

### 3.1 Front-end
| Mesure                        | Outil / Méthode                                |
|-------------------------------|------------------------------------------------|
| HTTPS obligatoire             | Certificat Let's Encrypt ou équivalent         |
| Protection XSS                | `DOMPurify`, éviter `dangerouslySetInnerHTML` |
| Content Security Policy       | CSP strict (script-src 'self', etc.)           |
| Cookies sécurisés             | `HttpOnly`, `Secure`, `SameSite=Strict`        |
| JWT                           | Stocké en mémoire (pas localStorage)          |
| reCAPTCHA                     | Sur inscription, connexion, contact            |

### 3.2 Back-end (Node.js + Express)
| Risque                     | Protection mise en place                         |
|----------------------------|--------------------------------------------------|
| Injection SQL              | Sequelize + requêtes paramétrées                 |
| Authentification           | Passport.js + JWT                                |
| CSRF                       | Middleware `csurf` ou double submit cookie       |
| Rate limiting              | `express-rate-limit` (100 req/15 min par IP)     |
| En-têtes sécurisés         | `helmet`                                         |
| Sessions                   | `express-session` + stockage serveur             |
| Logs d’activité            | `winston` + rotation des logs                    |

### 3.3 Base de données
**PostgreSQL**
- Rôles avec privilèges minimum  
- Chiffrement des données sensibles (`pgcrypto`)  
- Connexion SSL obligatoire  
- Sauvegardes automatiques quotidiennes  

**Firestore (optionnel pour stockage images/profil)**
- Règles de sécurité strictes  
- Accès authentifié uniquement

### 3.4 Bonnes pratiques globales
- Variables d’environnement (`.env`) pour clés API et secrets  
- Tests de sécurité réguliers ( npm audit)  
- Politique de confidentialité + bannière cookies (RGPD)  
- Validation Regex forte sur tous les champs (email, mot de passe, etc.)

---

## 4. Stack Technique

| Couche         | Technologie                         |
|----------------|-------------------------------------|
| Front-end      | React.js + Vite + React Router      |
| UI / Style     | Tailwind CSS ou SCSS + charte dédiée|
| Back-end       | Node.js + Express                   |
| Auth           | Passport.js + JWT                   |
| Base de données| PostgreSQL (Sequelize) + Firestore (optionnel) |
| Hébergement    | VPS / Render / Vercel + Railway     |
| Emails         | Nodemailer ou Resend                |

---

## 5. Résumé pour la Présentation (Diapositive)

**Titre** : Cahier des Charges – TechReuse Market

**Objectif** : Marketplace sécurisée pour matériel informatique d’occasion

**Fonctionnalités clés**  
- Catalogue complet avec filtres  
- Achat / Vente / Panier  
- Espace vendeur & administrateur  
- Système d’avis et notations  

**Sécurité renforcée**  
- HTTPS • JWT • Protection XSS/CSRF/SQLi  
- reCAPTCHA • Rate limiting • RGPD  

**Technologies**  
`React • Node.js • Express • PostgreSQL `

---

