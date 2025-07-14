import styled from "styled-components";
import Button from "../Button";

// Interface
interface Order {
  id_order: string;
  order_date: string;
  total_amount: string;
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
        <OrderItem key={order.id_order}>
          <div>
            <p>Commande #{order.id_order}</p>
            <p>
              - {new Date(order.order_date).toLocaleString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour:'numeric',  minute:'numeric'
              })} - {order.total_amount} € - {order.status}
            </p>
          </div>

          <Button text="Détails" variant="type3" width="100px" type="button" onClick={() => {}} />
        </OrderItem>
      ))
    ) : (
      <p >Aucune commande disponible.</p>
    )}
  </OrdersSection>
);

export default Orders;