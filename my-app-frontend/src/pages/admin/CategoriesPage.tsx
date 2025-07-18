import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import { type Category } from "../../types/types";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/admin/SearchBar";
import AddModal from "../../components/admin/AddModal";


const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Category>("name_category");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    fetchCategories();
  },[])
  const fetchCategories = () =>{
    axios.get("/category").then((res)=>setCategories(res.data))
  }
  const handleDelete = async (ids: string[]) => {
    console.log(ids)
    try {
      await Promise.all(ids.map(id =>
        axios.delete(`/category/${id}`)
      ));
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const handleAdd = async(values:Category) =>{
    const name_category = values.name_category;
    await axios.post("/category",{name_category})
    fetchCategories();
  }
  
  const handleEdit = async(id:string,values)=>{
    await axios.put(`/category/${id}`, values);
    fetchCategories();
  }

  const categoryFields: Field<Category>[] = [
    { key: "id_category", label: "ID", editable: false },
    { key: "name_category", label: "Nom", editable: true, type: "text" },
  ];
  useEffect(() => {
    const result = categories.filter((category) => {
      const value = category[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCategories(result);
  }, [search, selectedField, categories]);
  return (
    <AdminLayout>
      <PageTitle>Catégories</PageTitle>
      <SearchBar<Category>
        search={search}
        onSearchChange={setSearch}
        fields={categoryFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<Category>
        data={filteredCategories}
        fields={categoryFields}
        rowIdKey="id_category"
        onDeleteClick={(ids) => handleDelete(ids)}
        onUpdateClick={(id, values) => handleEdit(id, values)}
        addButton={true}
        onAddClick={()=>setIsModalOpen(true)}
      />
      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une catégorie"
        onSubmit={(values) => handleAdd(values)}
        fields={[
          { name: "name_category", label: "Nom", type: "text", required: true },
        ]}
      />
    </AdminLayout>
  );
};

export default CategoriesPage;
