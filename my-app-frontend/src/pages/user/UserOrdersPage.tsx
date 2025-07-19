import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";


interface Order {
  id_order: string;
  order_date: string;
  total_amount: string;
  status: string;
  listings: {
    id_listing: string;
    product: {
      name: string;
    };
  }[];
}


const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--color2);
`;

const OrdersContainer = styled.section`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  background-color: var(--color5);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
`;

const OrderItem = styled.div`
  border-bottom: 1px solid var(--color4);
  padding: 16px 0;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  p {
    margin: 0;
    color: var(--color1);
    font-size: 1rem;

    @media (max-width: 600px) {
      flex: 1 1 100%;
    }
  }
`;

const OrderTitle = styled.p`
  font-weight: bold;
  color: var(--color3);
`;
const ProductLink = styled.span`
  display: inline-block;
  color: var(--color3);
  cursor: pointer;
  text-decoration: underline;
  margin-right: 8px;

  &:hover {
    color: var(--color1);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  color: var(--color1);
  text-align: center;
`;

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/orders/me");
        console.log(response.data)
        setOrders(response.data || []);
      } catch (err) {
        setError("Erreur lors du chargement des commandes.");
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
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <UserLayout>
      <PageWrapper>
        <OrdersContainer>
          <PageTitle>Mes Commandes</PageTitle>

          {loading ? (
            <p>Chargement des commandes...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <OrderItem key={order.id_order}>
                <OrderInfo>
                    <OrderTitle>Commande #{order.id_order}</OrderTitle>
                    <p>Date : {formatDate(order.order_date)}</p>
                    <p>Montant : {parseFloat(order.total_amount).toFixed(2)} €</p>
                    <p style={{display:"flex"}}>
                        Produits :
                        {order.listings.map((listing, i) => (
                            <ProductLink
                            key={listing.id_listing}
                            onClick={() => navigate(`/product/${listing.id_listing}`)}
                            >
                            {listing.product.name}
                            {i < order.listings.length - 1 ? ',' : ''}
                            </ProductLink>
                        ))}
                    </p>
                  <p>Statut : {order.status}</p>
                </OrderInfo>
              </OrderItem>
            ))
          ) : (
            <EmptyMessage>Aucune commande disponible.</EmptyMessage>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </OrdersContainer>
      </PageWrapper>
    </UserLayout>
  );
};

export default UserOrdersPage;
