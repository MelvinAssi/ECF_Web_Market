import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import ProfileInfo from "../components/user/ProfileInfo";
import Orders from "../components/user/Orders";
import Sales from "../components/user/Sales";
import Ads from "../components/user/Ads";
import axios from "../services/axios";
import UserLayout from "../components/user/UserLayout";

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


const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
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

  
  const initialValues: UserInfo = {
    email: user?.email || "",
    name: "",
    firstname: "",
    adress: "",
    phone: "",
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "SELLER" || user?.role === "ADMIN") {
          const adsResponse = await axios.get("/listing/user");
          setAds(adsResponse.data || []);
          const salesResponse = await axios.get("/listing/user");
          setSales(salesResponse.data.sales || []);
        }
        const ordersResponse = await axios.get("/orders/me");
         console.log(ordersResponse.data)
          setOrders(ordersResponse.data || []);
        } catch (err) {
          setError("Erreur lors du chargement des données");
        }
      };
      fetchData();
    }, [user]);

    
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
        <UserLayout>
          <PageTitle>Catégories</PageTitle>
          <ContentContainer>
                {activeSection === "profile" && <ProfileInfo initialValues={initialValues} handleUpdate={handleUpdate} error={error} />}
                {activeSection === "orders" && <Orders orders={orders} />}
                {activeSection === "sales" && <Sales sales={sales} />}
                {activeSection === "ads" && <Ads ads={ads} handleDeleteAd={handleDeleteAd} navigate={navigate} />}
          </ContentContainer>
        </UserLayout> 
      </>
    );
  };

  export default AccountPage;