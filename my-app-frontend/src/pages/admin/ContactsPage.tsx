import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";
import type { Field } from "../../components/admin/AdminTable";
import AdminTable from "../../components/admin/AdminTable";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/admin/SearchBar";

interface Contact {
  id: string;
  email: string;
  category: string;
  createdAt: Date;
  description: string;
  isResolved:boolean;
  subject:string;
  phone?:string;
}


const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;
const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<keyof Contact>("email");
 
  const navigate =useNavigate();
  useEffect(()=>{
      axios.get("/contact").then((res)=>setContacts(res.data))
  },[])
  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(id => 
        axios.delete( `/contact/${id}`)
      ));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  const contactsFields: Field<Contact>[] = [
      { key: "id", label: "ID" },
      { key: "email", label: "Email" },
      { key: "category", label: "Categorie" },
      { key: "subject", label: "Sujet" },
      { key: "createdAt", label: "Date" },
      { key: "description", label: "Description" },
      { key: "isResolved", label: "Traité" },
      { key: "phone", label: "Téléphone" },
      
  ];

  useEffect(() => {
    const result = contacts.filter((contact) => {
      const value = contact[selectedField];
      return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredContacts(result);
  }, [search, selectedField, contacts]);
  return (
    <AdminLayout>
        <>
            <PageTitle>Gestion des Contacts</PageTitle>
              <SearchBar<Contact>
                search={search}
                onSearchChange={setSearch}
                fields={contactsFields}
                selectedField={selectedField}
                onFieldChange={setSelectedField}
              />
              <AdminTable<Contact>
              data={filteredContacts}
              fields={contactsFields}
              rowIdKey="id"
              onDeleteClick={(ids) => handleDelete(ids)}
              onEditClick={(id) => navigate(`/admin/review/${id}`)}
            />
        </>
    </AdminLayout>
  );
};

export default ContactsPage;
