import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import { type ProductWithCategory} from "../../types/types";
import type { Field } from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import AdminTable from "../../components/admin/AdminTable";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;


const ProductsPage = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const productFields: Field<ProductWithCategory>[] = [
    { key: "id_product", label: "ID" },
    { key: "verification_status", label: "Status" },
    { key: "name", label: "Nom" },
    { key: "price", label: "Prix" },
    { key: "condition", label: "Condition" },
    { key: "name_category" as keyof ProductWithCategory, label: "Catégorie" },
  ];
    useEffect(() => {
      axios.get("/product").then((res) => {
        const mapped = res.data.map((p: any) => ({
          ...p,
          name_category: p.category?.name_category ?? "Inconnue",
        }));
        setProducts(mapped);
        console.log(mapped)
      });
  }, []);
  return (
    <AdminLayout>
      <PageTitle>Produit</PageTitle>
      <AdminTable<ProductWithCategory>
        data={products}
        fields={productFields}
        rowIdKey="id_product"
        basePath="/admin/product"
      />
    </AdminLayout>
  );
};

export default ProductsPage;
