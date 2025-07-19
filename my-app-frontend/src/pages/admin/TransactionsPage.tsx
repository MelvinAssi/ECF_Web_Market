import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable, { type Field } from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import styled from "styled-components";
import { type Transaction } from "../../types/types";
import SearchBar from "../../components/admin/SearchBar";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
  const transactionsFields: Field[] = [
    { key: "id_transaction", label: "ID" },
    { key: "status", label: "Status" ,editable:true, type:"select",
      options: [
      { label: "PENDING", value: "PENDING" },
      { label: "VALIDATED", value: "VALIDATED" },
      { label: "CANCELLED", value: "CANCELLED" }
    ]},
    { key: "amount", label: "Total" },
    { key: "transaction_date", label: "Date" },
    { key: "buyer_id", label: "Acheteur" },
    { key: "order_id", label: "Order" },
  ];
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Transaction>("status");
  useEffect(()=>{
      fetchTransaction();
  },[])
  const fetchTransaction = () =>{
    axios.get("/transaction/admin").then((res) => {
      setTransactions(res.data);
    });
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/transaction", { data: { id } })
      ));
      fetchTransaction();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const handleEdit = async(id:string,values:any) =>{
      await axios.put(`transaction/${id}`, values);
      fetchTransaction();
  }
  useEffect(() => {
    const result = transactions.filter((transaction) => {
      const value = transaction[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTransactions(result);
  }, [search, selectedField, transactions]);
  return (
    <AdminLayout>
      <PageTitle>Transactions</PageTitle>
      <SearchBar<Transaction>
        search={search}
        onSearchChange={setSearch}
        fields={transactionsFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<Transaction>
        data={filteredTransactions}
        fields={transactionsFields}
        rowIdKey="id_transaction"
        onDeleteClick={(ids) => handleDelete(ids)}
        onUpdateClick={(id, values) => handleEdit(id, values)}    
      />
    </AdminLayout>
  );
};

export default TransactionsPage;
