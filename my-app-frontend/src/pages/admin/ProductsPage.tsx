import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { type Category, type Product} from "../../types/types";
import type { Field } from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import AdminTable from "../../components/admin/AdminTable";
import SearchBar from "../../components/admin/SearchBar";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;


const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Product>("name");
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(()=>{
      fetchProducts();
      fetchCategories();
  },[])
  const fetchProducts = () =>{
      axios.get("/product").then((res) => {
        const mapped = res.data.map((p: any) => ({
          ...p,
          name_category: p.category?.name_category ?? "Inconnue",
        }));
        setProducts(mapped);
      });
  }
  const fetchCategories = () => {
    axios.get("/category").then((res) => setCategories(res.data));
  };
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
  const handleEdit = async(id:string,values:any) =>{
      await axios.put(`product/${id}`, values);
      fetchProducts();
  }
  const productFields: Field[] = [
    { key: "id_product", label: "ID" },
    { key: "verification_status", label: "Status" ,editable:true, type:"select",
      options: [
      { label: "UNDER_VERIFICATION", value: "UNDER_VERIFICATION" },
      { label: "RECONDITIONED", value: "RECONDITIONED" },
      { label: "READY_TO_SELL", value: "READY_TO_SELL" },
      { label: "REJECTED", value: "REJECTED" }
    ]},
    { key: "name", label: "Nom" ,editable:true, type:"text"},
    { key: "description", label: "Description",editable:true, type:"textarea" },
    { key: "price", label: "Prix" ,editable:true, type:"number"},
    { key: "condition", label: "Condition" ,editable:true, type:"select",
      options: [
      { label: "GOOD", value: "GOOD" },
      { label: "NEW", value: "NEW" },
      { label: "USED", value: "USED" },
    ]},
    { key: "category.name_category" , label: "Catégorie" , editable: true, type: "select",
      options: categories.map(c => ({
        label: c.name_category,
        value: c.id_category
      }))}
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
      <SearchBar<Product>
        search={search}
        onSearchChange={setSearch}
        fields={productFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<Product>
        data={filteredProducts}
        fields={productFields}
        rowIdKey="id_product"
        onDeleteClick={(ids) => handleDelete(ids)}
        onUpdateClick={(id, values) => handleEdit(id, values)}        
      />
    </AdminLayout>
  );
};

export default ProductsPage;
