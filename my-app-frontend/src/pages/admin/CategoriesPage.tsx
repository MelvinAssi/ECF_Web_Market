import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import { type Category } from "../../types/types";
import { useNavigate } from "react-router-dom";


const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate =useNavigate();
  useEffect(()=>{
    fetchCategories();
  },[])
  const fetchCategories = () =>{
    axios.get("/category").then((res)=>setCategories(res.data))
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/category", { data: { id } })
      ));
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const categoryFields: Field<Category>[] = [
    { key: "id_category", label: "ID" },
    { key: "name_category", label: "Nom" },
  ];
  
  return (
    <AdminLayout>
      <PageTitle>Catégories</PageTitle>
      <AdminTable<Category>
        data={categories}
        fields={categoryFields}
        rowIdKey="id_category"
        onDeleteClick={(ids) => handleDelete(ids)}
        onEditClick={(id) => navigate(`/admin/review/${id}`)}
      />
    </AdminLayout>
  );
};

export default CategoriesPage;
