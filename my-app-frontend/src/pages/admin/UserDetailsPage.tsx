import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import AdminLayout from "../../components/admin/AdminLayout";

  const PageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color2);
    padding: 20px;
  `;

  const Form = styled.form`
    background-color: var(--color4);
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
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

const UserEditPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState("BUYER");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(true); 

  useEffect(() => {
    if (id) {
      axios.get(`/user/${id}`).then((res) => {
        setUser(res.data);
        setSelectedRole(res.data.role);
        setIsActive(res.data.is_active); 
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`user/admin/${id}`, {
        role: selectedRole,
        is_active: isActive,
      });
      setMessage("Modifications enregistrées !");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      setMessage("Erreur lors de la mise à jour.");
    }
  };


    if (!user) return <p>Chargement...</p>;

    return (
      <>
       
          <AdminLayout>
            <PageContainer>
                    <Form onSubmit={handleSubmit}>
            <Label>Id :<p>{user.id_user}</p></Label>
            <Label>Email :<p>{user.email}</p></Label>            
            <Label>Nom :<p>{user.firstname}</p></Label>            
            <Label>Prénom :<p>{user.firstname}</p></Label>
            <Label>Création :<p>{new Date(user.created_at).toLocaleString()}</p></Label>            
            <Label>Dernière connexion :<p>{new Date(user.last_activity).toLocaleString()}</p></Label>
            
            
            <Label style={{display:'flex' ,gap:10}}>Compte actif :  
              <input
                style={{accentColor:'var(--color3)'}}
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Label>

            <Label htmlFor="role">Rôle :</Label>          
            <Select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="BUYER">Acheteur</option>
              <option value="SELLER">Vendeur</option>
              <option value="ADMIN">Administrateur</option>
            </Select>

            <Button type="submit" text="Mettre à jour" width="100%" variant="type1" />
            {message && <p style={{ color: "var(--color3)" }}>{message}</p>}
          </Form>
        </PageContainer>
          </AdminLayout>

      </>
    );
  };

  export default UserEditPage;
