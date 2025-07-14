
import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { type Listing } from "../../types/types";
import { useEffect, useState } from "react";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import axios from "../../services/axios";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;


const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  const listingsFields: Field<Listing>[] = [
    { key: "id_listing", label: "ID" },
    { key: "status", label: "Statuts" },
    { key: "product_id", label: "Produits" },
    { key: "publication_date", label: "Date" },
    { key: "seller_id", label: "Vendeur" },
    
  ];

  useEffect(() => {
    axios.get("/listing/admin").then((res) => {
      setListings(res.data);
    });
  }, []);

  return (
    <AdminLayout>
      <PageTitle>Annonces</PageTitle>
        <AdminTable<Listing>
          data={listings}
          fields={listingsFields}
          rowIdKey="id_listing"
          basePath="/admin/listing"
        />
    </AdminLayout>
  );
};

export default ListingsPage;
