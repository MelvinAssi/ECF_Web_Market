import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import Orders from "../components/Orders";
import Sales from "../components/Sales";
import Ads from "../components/Ads";
import axios from "../services/axios";

// Interfaces
interface UserInfo {
  email: string;
  name: string;
  firstname: string;
  adress: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

interface Sale {
  id: string;
  date: string;
  total: string;
  status: string;
  buyerId: string;
}

interface Ad {
  id: string;
  name: string;
  description: string;
  price: string;
  state: string;
  category: string;
  image?: string;
}

// Styled Components
const PageContainer = styled.main`
  min-height: calc(100vh - 60px);
  display: flex;
  background-color: var(--color2); // #FFFFFF
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: var(--color1); // #34374C
  color: var(--color5); // #F6F6F6
  padding: 20px;
  border-radius: 10px;
  margin: 20px;

  @media (max-width: 767px) {
    width: 200px;
    margin: 16px;
    padding: 16px;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarLink = styled.li<{ $active: boolean }>`
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  color: ${({ $active }) => ($active ? "var(--color3)" : "var(--color5)")}; // #EE2B47 or #F6F6F6
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    color: var(--color3); // #EE2B47
    background-color: var(--color4); // #2C2E3E
  }

  @media (max-width: 767px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  @media (max-width: 767px) {
    margin: 16px;
  }
`;

const AccountPage = () => {
  const { user, signOut } = useAuthContext();
  const [activeSection, setActiveSection] = useState("profile");
  const [ads, setAds] = useState<Ad[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialisation des données utilisateur
  const initialValues: UserInfo = {
    email: user?.email || "",
    name: "",
    firstname: "",
    adress: "",
    phone: "",
  };

  // Charger les annonces, commandes et ventes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "SELLER") {
          const adsResponse = await axios.get("/ads/my-ads", {
            headers: { Authorization: `Bearer ${user.id_user}` },
          });
          setAds(adsResponse.data.ads || []);
          const salesResponse = await axios.get("/sales/my-sales", {
            headers: { Authorization: `Bearer ${user.id_user}` },
          });
          setSales(salesResponse.data.sales || []);
        }
        const ordersResponse = await axios.get("/orders/my-orders", {
          headers: { Authorization: `Bearer ${user.id_user}` },
          });
          setOrders(ordersResponse.data.orders || []);
        } catch (err) {
          setError("Erreur lors du chargement des données");
        }
      };
      fetchData();
    }, [user]);

    // Gestion de la mise à jour des informations
    const handleUpdate = async (values: UserInfo) => {
      try {
        await axios.put("/auth/update-profile", values, {
          headers: { Authorization: `Bearer ${user?.id_user}` },
        });
        alert("Profil mis à jour avec succès !");
      } catch (err) {
        setError("Erreur lors de la mise à jour du profil");
      }
    };

    // Gestion de la suppression d'une annonce
    const handleDeleteAd = async (adId: string) => {
      try {
        await axios.delete(`/ads/${adId}`, {
          headers: { Authorization: `Bearer ${user?.id_user}` },
        });
        setAds(ads.filter((ad) => ad.id !== adId));
        alert("Annonce supprimée avec succès !");
      } catch (err) {
        setError("Erreur lors de la suppression de l'annonce");
      }
    };

    return (
      <>
        <Header reduce={true} />
        <PageContainer>
          <Sidebar>
            <SidebarList>
              <SidebarLink $active={activeSection === "orders"} onClick={() => setActiveSection("orders")}>
                Mes Commandes
              </SidebarLink>
              {user?.role === "SELLER" && (
                <>
                  <SidebarLink $active={activeSection === "sales"} onClick={() => setActiveSection("sales")}>
                    Mes Ventes
                  </SidebarLink>
                  <SidebarLink $active={activeSection === "ads"} onClick={() => setActiveSection("ads")}>
                    Mes Annonces
                  </SidebarLink>
                </>
              )}
              <SidebarLink $active={activeSection === "profile"} onClick={() => setActiveSection("profile")}>
                Mes Informations Personnelles
              </SidebarLink>
              <SidebarLink $active={false} onClick={async () => {
                await signOut();
                navigate("/signin");
              }}>
                Déconnexion
              </SidebarLink>
            </SidebarList>
          </Sidebar>
          <ContentContainer>
            {activeSection === "profile" && <ProfileInfo initialValues={initialValues} handleUpdate={handleUpdate} error={error} />}
            {activeSection === "orders" && <Orders orders={orders} />}
            {activeSection === "sales" && <Sales sales={sales} />}
            {activeSection === "ads" && <Ads ads={ads} handleDeleteAd={handleDeleteAd} navigate={navigate} />}
          </ContentContainer>
        </PageContainer>
      </>
    );
  };

  export default AccountPage;