import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

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
  const navigate =useNavigate();
  useEffect(()=>{
      fetchReviews();
  },[])
  const fetchReviews = () =>{
      axios.get("/review/").then((res)=>setReviews(res.data))
  }
  const reviewsFields: Field<Review>[] = [
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
  return (
    <AdminLayout>
        <>
            <PageTitle>Gestion des Avis</PageTitle>
            <AdminTable<Review>
              data={reviews}
              fields={reviewsFields}
              rowIdKey="id"
              onDeleteClick={(ids) => handleDelete(ids)}
              onEditClick={(id) => navigate(`/admin/review/${id}`)}
            />
            
        </>
    </AdminLayout>
  );
};

export default ReviewsPage;
