import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { type ProductWithCategory} from "../../types/types";
import type { Field } from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import AdminTable from "../../components/admin/AdminTable";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/admin/SearchBar";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;


const ProductsPage = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof ProductWithCategory>("name");
  const navigate =useNavigate();
  useEffect(()=>{
      fetchProducts();
  },[])
  const fetchProducts = () =>{
      axios.get("/product").then((res) => {
        const mapped = res.data.map((p: any) => ({
          ...p,
          name_category: p.category?.name_category ?? "Inconnue",
        }));
        setProducts(mapped);
        console.log(mapped)
      });
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/product", { data: { id } })
      ));
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const productFields: Field<ProductWithCategory>[] = [
    { key: "id_product", label: "ID" },
    { key: "verification_status", label: "Status" },
    { key: "name", label: "Nom" },
    { key: "price", label: "Prix" },
    { key: "condition", label: "Condition" },
    { key: "name_category" as keyof ProductWithCategory, label: "Catégorie" },
  ];
  useEffect(() => {
    const result = products.filter((product) => {
      const value = product[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredProducts(result);
  }, [search, selectedField, products]);
  return (
    <AdminLayout>
      <PageTitle>Produit</PageTitle>
      <SearchBar<ProductWithCategory>
        search={search}
        onSearchChange={setSearch}
        fields={productFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<ProductWithCategory>
        data={filteredProducts}
        fields={productFields}
        rowIdKey="id_product"
        onDeleteClick={(ids) => handleDelete(ids)}
        onEditClick={(id) => navigate(`/admin/product/${id}`)}        
      />
    </AdminLayout>
  );
};

export default ProductsPage;
