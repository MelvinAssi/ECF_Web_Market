import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable, { type Field } from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import styled from "styled-components";
import { type Transaction } from "../../types/types";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
  const transactionsFields: Field<Transaction>[] = [
    { key: "id_transaction", label: "ID" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Total" },
    { key: "transaction_date", label: "Date" },
    { key: "buyer_id", label: "Acheteur" },
    { key: "order_id", label: "Order" },
  ];
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    axios.get("/transaction/admin").then((res) => {
      setTransactions(res.data);
    });
  }, []);
  return (
    <AdminLayout>
      <PageTitle>Transactions</PageTitle>
      <AdminTable<Transaction>
        data={transactions}
        fields={transactionsFields}
        rowIdKey="id_transaction"
        basePath="/admin/transaction"
      />
    </AdminLayout>
  );
};

export default TransactionsPage;
