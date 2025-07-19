import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { type Category } from "../../types/types";
import UserLayout from "../../components/user/UserLayout";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 10px;
`;

const Form = styled.form`
  background-color: var(--color4);
  padding: 20px;
  border-radius: 8px;
  min-width: 250px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--color2);
`;

const Label = styled.label`
  font-weight: bold;
  color: var(--color5);
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--color4);
  background-color: var(--color1);
  color: var(--color5);
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  background-color: var(--color5);
  color: var(--color1);
  border: none;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border-radius: 6px;
  background-color: var(--color5);
  color: var(--color1);
  border: none;
  resize: none;
`;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [condition, setCondition] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    console.log(id)
    
    if (id) {
      axios.get(`/product/${id}`).then((res) => {
        const data = res.data;
        console.log(data)
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setVerificationStatus(data.verification_status);
        setCondition(data.condition);
        setCategoryId(data.category_id);
      });
    }
    fetchCategories();
  }, [id]);

  const fetchCategories = () => {
    axios.get("/category").then((res) => setCategories(res.data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/product/${id}`, {
        name,
        description,
        price,
        verification_status: verificationStatus,
        condition,
        category_id: categoryId,
      });
      setMessage("Produit mis à jour avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la mise à jour.");
    }
  };

  //if (!product) return <p>Chargement...</p>;

  return (
    <UserLayout>
      <PageContainer>
        <Form onSubmit={handleSubmit}>
          <Label>ID :</Label>
          <p>{product?.id_product}</p>

          <Label>Nom :</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />

          <Label>Description :</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

          <Label>Prix :</Label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />

          <Label>Images :</Label>
          {product?.images?.map((image: string, idx: number) => (
            <a style={{textDecoration:"none",color:"var(--color5)"}} key={idx} href={image} target="_blank" rel="noopener noreferrer" aria-label="image">Image {idx}</a>
          ))}

          <Label>Catégorie :</Label>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.name_category}
              </option>
            ))}
          </Select>
            {/* 
          <Label>Statut de vérification :</Label>
          <Select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
            <option value="UNDER_VERIFICATION">UNDER_VERIFICATION</option>
            <option value="RECONDITIONED">RECONDITIONED</option>
            <option value="READY_TO_SELL">READY_TO_SELL</option>
            <option value="REJECTED">REJECTED</option>
          </Select>
              */}
          <Label>État :</Label>
          <Select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="NEW">Neuf</option>
            <option value="GOOD">Bon état</option>
            <option value="USED">Passable</option>
          </Select>

          <Button type="submit" text="Mettre à jour" width="100%" variant="type1" />
          {message && <p style={{ color: "var(--color3)" }}>{message}</p>}
        </Form>
      </PageContainer>
    </UserLayout>
  );
};

export default ProductDetailsPage;
