import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable, { type Field } from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import styled from "styled-components";
import { type Order } from "../../types/types";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;



const OrdersPage = () => {
  const [oders, setOders] = useState<Order[]>([]);
    useEffect(() => {
    axios.get("/orders/admin").then((res) => {
      setOders(res.data);
    });
  }, []);

  const orderFields: Field<Order>[] = [
    { key: "id_order", label: "ID" },
    { key: "order_date", label: "Date" },
    { key: "total_amount", label: "Total" },
    { key: "status", label: "Statut" },
    { key: "listings", label: "Annonces" },
    { key: "buyer_id", label: "Acheteur" },
  ];
  return (
    <AdminLayout>
      <PageTitle>Commandes</PageTitle>
      <AdminTable<Order>
        data={oders}
        fields={orderFields}
        rowIdKey="id_order"
        basePath="/admin/order"
      />
    </AdminLayout>
  );
};

export default OrdersPage;
