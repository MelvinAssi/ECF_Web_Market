
import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { type Listing } from "../../types/types";
import { useEffect, useState } from "react";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/admin/SearchBar";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;


const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Listing>("status");
  const navigate =useNavigate();
  useEffect(()=>{
      fetchListings();      
  },[])
  const fetchListings = () =>{
    axios.get("/listing/admin").then((res) => {
      setListings(res.data);
    });
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/listing", { data: { id } })
      ));
      fetchListings();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  useEffect(() => {
    const result = listings.filter((listing) => {
      const value = listing[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredListings(result);
  }, [search, selectedField, listings]);
  
  const listingsFields: Field<Listing>[] = [
    { key: "id_listing", label: "ID" },
    { key: "status", label: "Statuts" },
    { key: "product_id", label: "Produits" },
    { key: "publication_date", label: "Date" },
    { key: "seller_id", label: "Vendeur" },
    
  ];

  return (
    <AdminLayout>
      <PageTitle>Annonces</PageTitle>
      <SearchBar<Listing>
        search={search}
        onSearchChange={setSearch}
        fields={listingsFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
        <AdminTable<Listing>
          data={filteredListings}
          fields={listingsFields}
          rowIdKey="id_listing"
          onDeleteClick={(ids) => handleDelete(ids)}
          onEditClick={(id) => navigate(`/admin/listing/${id}`)}          
        />
    </AdminLayout>
  );
};

export default ListingsPage;
