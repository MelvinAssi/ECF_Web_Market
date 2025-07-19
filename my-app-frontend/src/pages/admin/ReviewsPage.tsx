import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import SearchBar from "../../components/admin/SearchBar";

interface Review {
  id: string;
  user: User;
  text: string;
  star: number;
}
interface User{
  name:string;
  firstname:string
}
const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Review>("text");
  useEffect(()=>{
      fetchReviews();
  },[])
  const fetchReviews = () =>{
      axios.get("/review/").then((res)=>setReviews(res.data))
  }
  const reviewsFields: Field[] = [
      { key: "id", label: "ID" },
      { key: "text", label: "Text" },
      { key: "star", label: "Note" },
      { key: "user.name", label: "Nom" },
      { key: "user.firstname", label: "Prénom" },
  ];
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/review", { data: { id } })
      ));
      fetchReviews();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  useEffect(() => {
    const result = reviews.filter((review) => {
      const value = getNestedValue(review, selectedField as string);
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase())||
          (typeof value === "number" && value.toString().includes(search));
    });
    setFilteredReviews(result);
  }, [search, selectedField, reviews]);
  
  const getNestedValue = (obj: any, path: string) =>
    path.split(".").reduce((acc, part) => acc?.[part], obj);
  return (
    <AdminLayout>
      <PageTitle>Gestion des Avis</PageTitle>
      <SearchBar<Review>
        search={search}
        onSearchChange={setSearch}
        fields={reviewsFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<Review>
        data={filteredReviews}
        fields={reviewsFields}
        rowIdKey="id"
        onDeleteClick={(ids) => handleDelete(ids)}
      />
    </AdminLayout>
  );
};

export default ReviewsPage;
