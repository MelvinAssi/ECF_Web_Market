import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable, { type Field } from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import styled from "styled-components";
import { type Order } from "../../types/types";
import SearchBar from "../../components/admin/SearchBar";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;



const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Order>("total_amount");

  useEffect(()=>{
      fetchOrders();
  },[])
  const fetchOrders = () =>{
    axios.get("/orders/admin").then((res) => {
      setOrders(res.data);
    });
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/orders", { data: { id } })
      ));
      fetchOrders();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const handleEdit = async(id:string,values) =>{
      await axios.put(`orders/admin/${id}`, values);
      fetchOrders();
  }

  const orderFields: Field<Order>[] = [
    { key: "id_order", label: "ID" },
    { key: "order_date", label: "Date" },
    { key: "total_amount", label: "Total" },
    { key: "status", label: "Statut",editable:true, type:"select",
      options: [
      { label: "PENDING", value: "PENDING" },
      { label: "VALIDATED", value: "VALIDATED" },
      { label: "DELIVERED", value: "DELIVERED" }
    ]},
    { key: "listings.0.id_listing", label: "Annonce ID" },
    { key: "buyer_id", label: "Acheteur" },
  ];
  useEffect(() => {
    const result = orders.filter((order) => {
      const value = order[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredOrders(result);
  }, [search, selectedField, orders]); 
  return (
    <AdminLayout>
      <PageTitle>Commandes</PageTitle>
      <SearchBar<Order>
        search={search}
        onSearchChange={setSearch}
        fields={orderFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<Order>
        data={filteredOrders}
        fields={orderFields}
        rowIdKey="id_order"
        onDeleteClick={(ids) => handleDelete(ids)}
        onUpdateClick={(id, values) => handleEdit(id, values)} 
      />
    </AdminLayout>
  );
};

export default OrdersPage;
