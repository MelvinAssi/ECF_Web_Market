import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";
import Button from "../../components/Button";

interface Order {
  id_order: string;
  order_date: string;
  total_amount: string;
  status: string;
}

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
const OrdersContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5);
  border-radius: 6px;
`;
const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--color4); 
`;


const UserOrdersPage = () =>{
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState("");
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await axios.get("/orders/me");
                setOrders(ordersResponse.data || []);
            } catch (err) {
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const formatDate = (isoString: string) =>
        new Date(isoString).toLocaleString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
    });

        return (
      <>
        <UserLayout>
            <PageTitle>Mes Commandes</PageTitle>
            <OrdersContainer>
                <h3 style={{ fontFamily: "Cormorant, serif", color: "#34374C" }}>Mes Commandes</h3>
                {loading ? (
                    <p>Chargement des commandes...</p>
                ) : orders.length > 0 ? (
                orders.map((order) => (
                    <OrderItem key={order.id_order}>
                    <div>
                        <p>Commande #{order.id_order}</p>
                        <p>- {formatDate(order.order_date)} - {order.total_amount} € - {order.status}</p>
                    </div>
                    <Button text="Détails" variant="type3" width="100px" type="button" onClick={() => {}} />
                    </OrderItem>
                ))
                ) : (
                <p>Aucune commande disponible.</p>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </OrdersContainer>
        </UserLayout> 
      </>
    );

}
export default UserOrdersPage;