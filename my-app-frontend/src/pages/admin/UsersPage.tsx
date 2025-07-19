import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable, { type Field } from "../../components/admin/AdminTable";
import axios from "../../services/axios";
import SearchBar from "../../components/admin/SearchBar";
import styled from "styled-components";
import { type User } from "../../types/types";

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof User>("email");

  useEffect(()=>{
    fetchUsers();
  },[])
  const fetchUsers = () =>{
    axios.get("/user/admin").then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete("/user/admin", { data: { id } })
      ));
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const handleEdit = async(id:string,values:any) =>{
      await axios.put(`user/admin/${id}`, values);
      fetchUsers();
  }
  const userFields: Field[] = [
    { key: "id_user", label: "ID" },
    { key: "email", label: "Email" },
    { key: "role", label: "Rôle",editable: true, type: "select" ,   
      options: [
      { label: "BUYER", value: "BUYER" },
      { label: "SELLER", value: "SELLER" },
      { label: "ADMIN", value: "ADMIN" }
    ]},
    { key: "name", label: "Nom" },
    { key: "firstname", label: "Prénom" },
    { key: "adress", label: "Adresse" },
    { key: "phone", label: "Téléphone" },
    { key: "is_active",label:"Actif",editable: true, type:"boolean"},
    { key: "created_at", label: "Création" },
    { key: "last_activity", label: "Connexion " },

  ];
  useEffect(() => {
    const result = users.filter((user) => {
      const value = user[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search, selectedField, users]);

  return (
    <AdminLayout>
      <PageTitle>Utilisateurs</PageTitle>
      <SearchBar<User>
        search={search}
        onSearchChange={setSearch}
        fields={userFields}
        selectedField={selectedField}
        onFieldChange={setSelectedField}
      />
      <AdminTable<User>
        data={filteredUsers}
        fields={userFields}
        rowIdKey="id_user"
        onDeleteClick={(ids) => handleDelete(ids)}    
        onUpdateClick={(id, values) => handleEdit(id, values)}  
      />
    </AdminLayout>  
  );
};

export default UsersPage;
