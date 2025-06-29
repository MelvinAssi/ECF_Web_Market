# Conception de la Base de Données avec Merise - TechReuse Market

## Sommaire
1. [Règles de Gestion](#règles-de-gestion)
2. [Dictionnaire de Données](#dictionnaire-de-données)
3. [MCD](#mcd)
4. [MLD](#mld)
5. [MPD](#mpd)
6. [Tableaux SQL](#tableaux-sql)

## Règles de Gestion

### 🔐 Utilisateurs et Sécurité
1. Un **User** est identifié par un identifiant unique (`id_user`) dans la base de données.
2. Chaque User possède une adresse e-mail unique, valide et obligatoire dans la table `user`.
3. Le mot de passe est obligatoire, haché avec bcrypt ou Argon2id, et stocké dans la table `user`.
4. La date de création d’un compte est enregistrée automatiquement dans la table `user`.
5. Les comptes peuvent être désactivés par un Admin via le champ `is_active` dans la table `user`.
6. Les sessions sont gérées avec un champ `last_activity` pour suivre l’inactivité (expiration après 30 minutes).
7. Le rôle d’un User est défini comme `BUYER`, `SELLER` ou `ADMIN` dans la table `user`.

### 🛒 Gestion des Produits et Annonces
8. Un **Product** est identifié par un identifiant unique (`id_product`) et lié à une **Category**.
9. Chaque Product possède un nom, une description, un prix, un état (`NEW`, `GOOD`, `USED`), un statut de vérification (`UNDER_VERIFICATION`, `RECONDITIONED`, `READY_TO_SELL`, `REJECTED`), et des images.
10. Une **Listing** est créée par un Seller et liée à un seul Product dans la base.
11. Les Products soumis via une Listing passent par une vérification obligatoire par l’entreprise avant d’être mis en vente.
12. Les Products nécessitant un reconditionnement (ex. : changement de batterie pour un téléphone) sont marqués comme `RECONDITIONED` après traitement.
13. Les Products non conformes (ex. : chargeur cassé) sont marqués comme `REJECTED` et ne peuvent pas être mis en vente.
14. Seuls les Products avec le statut `READY_TO_SELL` sont visibles dans le catalogue public.
15. Les Listings ont un statut (`PENDING`, `ONLINE`, `DELETED`) géré dans la table `listing`.

### 🛍️ Gestion des Achats et Commandes
16. Un **Buyer** peut créer un **Cart** lié à son `id_user` dans la base.
17. Une **Order** est identifiée par un `id_order`, liée à un Buyer, et contient plusieurs Products via une table d’association.
18. Une **Transaction** relie une Order, un Buyer et un Seller, avec un montant et un statut (`PENDING`, `VALIDATED`, `CANCELLED`).
19. La date et le montant total d’une Order sont enregistrés dans la table `order`.

### ⭐ Gestion des Avis
20. Un **Review** est laissé par un Buyer sur un Product ou un Seller, avec un commentaire, une note (1 à 5) et une date.
21. Les Reviews sont stockés dans la table `review` et peuvent être validés ou supprimés par un Admin.

### 📩 Formulaire de Contact
22. Un message de contact est stocké dans la table `contact` avec un titre, une description, un e-mail et une date d’envoi.
23. Les messages ont un statut (`PENDING`, `READ`, `RESPONDED`) et peuvent être liés à un Admin qui les traite.

### 📊 Statistiques
24. Les **Statistics** sont stockées dans la table `statistic`, avec le nombre de produits vendus, le chiffre d’affaires et une période.
25. Les Statistics peuvent être filtrées par catégorie via un champ `category_id`.

## Dictionnaire de Données

### 1. User
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_user | UUID / SERIAL | PK, unique, non nul | Identifiant unique de l’utilisateur |
| email | VARCHAR(100) | unique, non nul, format email | Adresse e-mail de l’utilisateur |
| password | TEXT | non nul, haché (bcrypt/Argon2id) | Mot de passe haché |
| name | VARCHAR(100) | non nul | Nom de l’utilisateur |
| role | ENUM | valeurs : 'BUYER', 'SELLER', 'ADMIN' | Rôle de l’utilisateur |
| created_at | TIMESTAMP | auto-généré | Date de création du compte |
| is_active | BOOLEAN | défaut true | Statut actif ou désactivé |
| last_activity | TIMESTAMP | optionnel | Dernière activité pour gestion des sessions |

### 2. Product
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_product | UUID / SERIAL | PK, unique, non nul | Identifiant unique du produit |
| name | VARCHAR(100) | non nul | Nom du produit |
| description | TEXT | optionnel | Description du produit |
| price | DECIMAL(10,2) | non nul, ≥ 0 | Prix du produit |
| condition | ENUM | valeurs : 'NEW', 'GOOD', 'USED' | État initial du produit |
| verification_status | ENUM | valeurs : 'UNDER_VERIFICATION', 'RECONDITIONED', 'READY_TO_SELL', 'REJECTED' | Statut de vérification |
| images | TEXT[] | optionnel | URLs des images du produit |
| category_id | FOREIGN KEY | vers Category(id_category), non nul | Référence à la catégorie |

### 3. Listing
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_listing | UUID / SERIAL | PK, unique, non nul | Identifiant unique de l’annonce |
| publication_date | TIMESTAMP | auto-généré | Date de publication |
| status | ENUM | valeurs : 'PENDING', 'ONLINE', 'DELETED' | Statut de l’annonce |
| seller_id | FOREIGN KEY | vers User(id_user), non nul | Vendeur ayant publié l’annonce |
| product_id | FOREIGN KEY | vers Product(id_product), non nul | Produit lié à l’annonce |

### 4. Category
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_category | UUID / SERIAL | PK, unique, non nul | Identifiant unique de la catégorie |
| name_category | VARCHAR(100) | non nul, unique | Nom de la catégorie (ex. : ordinateurs, smartphones) |

### 5. Order
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_order | UUID / SERIAL | PK, unique, non nul | Identifiant unique de la commande |
| order_date | TIMESTAMP | auto-généré | Date de la commande |
| total_amount | DECIMAL(10,2) | non nul, ≥ 0 | Montant total de la commande |
| status | ENUM | valeurs : 'PENDING', 'VALIDATED', 'DELIVERED' | Statut de la commande |
| buyer_id | FOREIGN KEY | vers User(id_user), non nul | Acheteur ayant passé la commande |

### 6. Cart
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_cart | UUID / SERIAL | PK, unique, non nul | Identifiant unique du panier |
| buyer_id | FOREIGN KEY | vers User(id_user), non nul | Acheteur associé au panier |
| creation_date | TIMESTAMP | auto-généré | Date de création du panier |

### 7. Cart_Product (Table d'association)
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_cart | FOREIGN KEY | vers Cart(id_cart), non nul | Référence au panier |
| id_product | FOREIGN KEY | vers Product(id_product), non nul | Référence au produit |
| quantity | INTEGER | non nul, ≥ 1 | Quantité du produit dans le panier |
| **Clé primaire** | (id_cart, id_product) | Combinaison unique | Clé composite |

### 8. Review
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_review | UUID / SERIAL | PK, unique, non nul | Identifiant unique de l’avis |
| comment | TEXT | optionnel | Commentaire de l’avis |
| rating | INTEGER | non nul, 1 à 5 | Note attribuée |
| review_date | TIMESTAMP | auto-généré | Date de l’avis |
| buyer_id | FOREIGN KEY | vers User(id_user), non nul | Acheteur ayant laissé l’avis |
| product_id | FOREIGN KEY | vers Product(id_product), optionnel | Produit concerné (optionnel si avis sur vendeur) |
| seller_id | FOREIGN KEY | vers User(id_user), optionnel | Vendeur concerné (optionnel si avis sur produit) |

### 9. Transaction
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_transaction | UUID / SERIAL | PK, unique, non nul | Identifiant unique de la transaction |
| transaction_date | TIMESTAMP | auto-généré | Date de la transaction |
| amount | DECIMAL(10,2) | non nul, ≥ 0 | Montant de la transaction |
| status | ENUM | valeurs : 'PENDING', 'VALIDATED', 'CANCELLED' | Statut de la transaction |
| buyer_id | FOREIGN KEY | vers User(id_user), non nul | Acheteur |
| seller_id | FOREIGN KEY | vers User(id_user), non nul | Vendeur |
| order_id | FOREIGN KEY | vers Order(id_order), non nul | Commande associée |

### 10. Contact
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_contact | UUID / SERIAL | PK, unique, non nul | Identifiant unique du message |
| title | VARCHAR(255) | non nul | Titre du message |
| description | TEXT | non nul | Corps du message |
| email | VARCHAR(100) | non nul, format email | E-mail de l’expéditeur |
| sent_date | TIMESTAMP | auto-généré | Date d’envoi |
| status | ENUM | valeurs : 'PENDING', 'READ', 'RESPONDED' | Statut du message |
| admin_id | FOREIGN KEY | vers User(id_user), optionnel | Administrateur ayant traité |

### 11. Statistic
| Nom du champ | Type | Contraintes | Description |
|--------------|------|-------------|-------------|
| id_statistic | UUID / SERIAL | PK, unique, non nul | Identifiant unique de la statistique |
| products_sold | INTEGER | ≥ 0 | Nombre de produits vendus |
| revenue | DECIMAL(12,2) | ≥ 0 | Chiffre d’affaires généré |
| period | DATE | non nul | Période concernée |
| category_id | FOREIGN KEY | vers Category(id_category), optionnel | Catégorie concernée (optionnel) |

## MCD (Modèle Conceptuel de Données)
Le MCD représente les entités et leurs relations avec les cardinalités. Voici une description textuelle (une image réelle nécessiterait un outil comme Mocodo ou Draw.io) :

### Entités et Relations
- **User** (id_user, email, password, name, role, created_at, is_active, last_activity)
  - **Publishes** (0,N) -> **Listing** (1,1): Un Seller peut publier plusieurs Listings, une Listing est publiée par un seul Seller.
  - **Places** (0,N) -> **Order** (1,1): Un Buyer peut passer plusieurs Orders, une Order est passée par un seul Buyer.
  - **Owns** (0,N) -> **Cart** (1,1): Un Buyer peut posséder un Cart, un Cart appartient à un seul Buyer.
  - **Leaves** (0,N) -> **Review** (1,1): Un Buyer peut laisser plusieurs Reviews, un Review est laissé par un seul Buyer.
  - **Handles** (0,N) -> **Contact** (0,1): Un Admin peut traiter plusieurs messages, un message est traité par au plus un Admin.

- **Product** (id_product, name, description, price, condition, verification_status, images, category_id)
  - **Belongs to** (1,1) -> **Category** (0,N): Un Product appartient à une seule Category, une Category peut contenir plusieurs Products.
  - **Concerned by** (1,1) -> **Listing** (1,1): Une Listing concerne un seul Product, un Product est lié à une seule Listing.
  - **Contained in** (0,N) -> **Cart_Product** (1,N): Un Product peut être dans plusieurs Carts, un Cart peut contenir plusieurs Products.
  - **Evaluated by** (0,N) -> **Review** (0,1): Un Product peut recevoir plusieurs Reviews, un Review peut concerner un Product.

- **Listing** (id_listing, publication_date, status, seller_id, product_id)
- **Category** (id_category, name_category)
- **Order** (id_order, order_date, total_amount, status, buyer_id)
  - **Includes** (1,1) -> **Transaction** (1,N): Une Order est liée à une ou plusieurs Transactions.

- **Cart** (id_cart, buyer_id, creation_date)
  - **Contains** (1,1) -> **Cart_Product** (0,N): Un Cart peut contenir plusieurs Products via la table d’association.

- **Cart_Product** (id_cart, id_product, quantity)
- **Review** (id_review, comment, rating, review_date, buyer_id, product_id, seller_id)
- **Transaction** (id_transaction, transaction_date, amount, status, buyer_id, seller_id, order_id)
- **Contact** (id_contact, title, description, email, sent_date, status, admin_id)
- **Statistic** (id_statistic, products_sold, revenue, period, category_id)

**Note** : Pour visualiser le MCD, un outil comme Mocodo peut être utilisé pour générer un diagramme graphique basé sur cette description.

## MLD (Modèle Logique de Données)
Le MLD traduit le MCD en tables relationnelles, en respectant les contraintes et les relations.

1. **User** (id_user: UUID PK, email: VARCHAR(100) UNIQUE, password: TEXT, name: VARCHAR(100), role: ENUM('BUYER', 'SELLER', 'ADMIN'), created_at: TIMESTAMP, is_active: BOOLEAN, last_activity: TIMESTAMP)
2. **Product** (id_product: UUID PK, name: VARCHAR(100), description: TEXT, price: DECIMAL(10,2), condition: ENUM('NEW', 'GOOD', 'USED'), verification_status: ENUM('UNDER_VERIFICATION', 'RECONDITIONED', 'READY_TO_SELL', 'REJECTED'), images: TEXT[], category_id: UUID FK -> Category)
3. **Listing** (id_listing: UUID PK, publication_date: TIMESTAMP, status: ENUM('PENDING', 'ONLINE', 'DELETED'), seller_id: UUID FK -> User, product_id: UUID FK -> Product)
4. **Category** (id_category: UUID PK, name_category: VARCHAR(100) UNIQUE)
5. **Order** (id_order: UUID PK, order_date: TIMESTAMP, total_amount: DECIMAL(10,2), status: ENUM('PENDING', 'VALIDATED', 'DELIVERED'), buyer_id: UUID FK -> User)
6. **Cart** (id_cart: UUID PK, buyer_id: UUID FK -> User, creation_date: TIMESTAMP)
7. **Cart_Product** (id_cart: UUID FK -> Cart, id_product: UUID FK -> Product, quantity: INTEGER, PK(id_cart, id_product))
8. **Review** (id_review: UUID PK, comment: TEXT, rating: INTEGER CHECK(1 <= rating <= 5), review_date: TIMESTAMP, buyer_id: UUID FK -> User, product_id: UUID FK -> Product NULL, seller_id: UUID FK -> User NULL)
9. **Transaction** (id_transaction: UUID PK, transaction_date: TIMESTAMP, amount: DECIMAL(10,2), status: ENUM('PENDING', 'VALIDATED', 'CANCELLED'), buyer_id: UUID FK -> User, seller_id: UUID FK -> User, order_id: UUID FK -> Order)
10. **Contact** (id_contact: UUID PK, title: VARCHAR(255), description: TEXT, email: VARCHAR(100), sent_date: TIMESTAMP, status: ENUM('PENDING', 'READ', 'RESPONDED'), admin_id: UUID FK -> User NULL)
11. **Statistic** (id_statistic: UUID PK, products_sold: INTEGER, revenue: DECIMAL(12,2), period: DATE, category_id: UUID FK -> Category NULL)

## MPD (Modèle Physique de Données)
Le MPD est une implémentation spécifique pour PostgreSQL, incluant les types de données, contraintes et index.

### Tables et Contraintes
- Les clés primaires utilisent `UUID` généré par `gen_random_uuid()` pour une meilleure sécurité.
- Les clés étrangères incluent des contraintes `ON DELETE` et `ON UPDATE` (RESTRICT ou CASCADE selon le cas).
- Les champs sensibles (password) utilisent `TEXT` pour stocker les hachages.
- Les énumérations sont implémentées avec le type `ENUM` de PostgreSQL.
- Les images des Products sont stockées comme un tableau de chaînes (`TEXT[]`).

## Tableaux SQL

```sql
-- Création des types ENUM
CREATE TYPE role_type AS ENUM ('BUYER', 'SELLER', 'ADMIN');
CREATE TYPE condition_type AS ENUM ('NEW', 'GOOD', 'USED');
CREATE TYPE verification_status_type AS ENUM ('UNDER_VERIFICATION', 'RECONDITIONED', 'READY_TO_SELL', 'REJECTED');
CREATE TYPE listing_status_type AS ENUM ('PENDING', 'ONLINE', 'DELETED');
CREATE TYPE order_status_type AS ENUM ('PENDING', 'VALIDATED', 'DELIVERED');
CREATE TYPE transaction_status_type AS ENUM ('PENDING', 'VALIDATED', 'CANCELLED');
CREATE TYPE contact_status_type AS ENUM ('PENDING', 'READ', 'RESPONDED');

-- Table Users
CREATE TABLE users (
    id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    role role_type NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP
);

-- Table Category
CREATE TABLE category (
    id_category UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_category VARCHAR(100) NOT NULL UNIQUE
);

-- Table Product
CREATE TABLE product (
    id_product UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    condition condition_type NOT NULL,
    verification_status verification_status_type NOT NULL,
    images TEXT[],
    category_id UUID NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id_category) ON DELETE RESTRICT
);

-- Table Listing
CREATE TABLE listing (
    id_listing UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_date TIMESTAMP DEFAULT NOW(),
    status listing_status_type NOT NULL,
    seller_id UUID NOT NULL,
    product_id UUID NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id_product) ON DELETE CASCADE
);

-- Table Orders (renommée de "order" à "orders")
CREATE TABLE orders (
    id_order UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_date TIMESTAMP DEFAULT NOW(),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status_type NOT NULL,
    buyer_id UUID NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id_user) ON DELETE CASCADE
);

-- Table Cart
CREATE TABLE cart (
    id_cart UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL,
    creation_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (buyer_id) REFERENCES users(id_user) ON DELETE CASCADE
);

-- Table Cart_Product (association)
CREATE TABLE cart_product (
    id_cart UUID NOT NULL,
    id_product UUID NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 1),
    PRIMARY KEY (id_cart, id_product),
    FOREIGN KEY (id_cart) REFERENCES cart(id_cart) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES product(id_product) ON DELETE CASCADE
);

-- Table Transactions (renommée de "transaction" à "transactions")
CREATE TABLE transactions (
    id_transaction UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_date TIMESTAMP DEFAULT NOW(),
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    status transaction_status_type NOT NULL,
    buyer_id UUID NOT NULL,
    seller_id UUID NOT NULL,
    order_id UUID NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id_order) ON DELETE CASCADE
);

-- Table Review
CREATE TABLE review (
    id_review UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_date TIMESTAMP DEFAULT NOW(),
    buyer_id UUID NOT NULL,
    product_id UUID,
    seller_id UUID,
    FOREIGN KEY (buyer_id) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id_product) ON DELETE SET NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id_user) ON DELETE SET NULL
);

-- Table Contact
CREATE TABLE contact (
    id_contact UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    sent_date TIMESTAMP DEFAULT NOW(),
    status contact_status_type NOT NULL,
    admin_id UUID,
    FOREIGN KEY (admin_id) REFERENCES users(id_user) ON DELETE SET NULL
);

-- Table Statistic
CREATE TABLE statistic (
    id_statistic UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    products_sold INTEGER NOT NULL CHECK (products_sold >= 0),
    revenue DECIMAL(12,2) NOT NULL CHECK (revenue >= 0),
    period DATE NOT NULL,
    category_id UUID,
    FOREIGN KEY (category_id) REFERENCES category(id_category) ON DELETE SET NULL
);
```
