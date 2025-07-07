import styled from "styled-components";
import Button from "./Button";

// Interface
interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

// Styled Components
const OrdersSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5); // #F6F6F6
  border-radius: 6px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--color4); // #2C2E3E
`;

const Orders = ({ orders }: { orders: Order[] }) => (
  <OrdersSection>
    <h3 style={{ fontFamily: "Cormorant, serif", color: "#34374C" }}>Mes Commandes</h3>
    {orders.length > 0 ? (
      orders.map((order) => (
        <OrderItem key={order.id}>
          <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>
            Commande #{order.id} - {order.date} - {order.total} - {order.status}
          </p>
          <Button text="Détails" variant="type3" width="100px" type="button" onClick={() => {}} />
        </OrderItem>
      ))
    ) : (
      <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>Aucune commande disponible.</p>
    )}
  </OrdersSection>
);

export default Orders;