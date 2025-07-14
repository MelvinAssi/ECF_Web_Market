import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import Modal from "../../components/Modal";


interface UserInfo {
  email: string;
  name: string;
  firstname: string;
  adress: string;
  phone: string;
  newPassword?: string;
}


const validationSchema = Yup.object({
  email: Yup.string()
    .required("L'email est obligatoire")
    .email("Format d'email invalide")
    .max(64, "Email trop long !"),
  name: Yup.string()
    .required("Le nom est obligatoire")
    .min(2, "Nom trop court !")
    .max(64, "Nom trop long !"),
  firstname: Yup.string()
    .required("Le prénom est obligatoire")
    .min(2, "Prénom trop court !")
    .max(64, "Prénom trop long !"),
  adress: Yup.string()
    .required("L'adresse est obligatoire")
    .min(2, "Adresse trop courte !")
    .max(64, "Adresse trop longue !"),
  phone: Yup.string()
    .required("Le numéro est obligatoire")
    .matches(/^[0-9]{10}$/, "Numéro invalide !"),
  newPassword: Yup.string()
    .optional()
    .min(12, "Le nouveau mot de passe doit contenir au moins 12 caractères")
    .matches(/[A-Z]/, "Doit contenir au moins une majuscule")
    .matches(/[a-z]/, "Doit contenir au moins une minuscule")
    .matches(/\d/, "Doit contenir au moins un chiffre")
    .matches(/[!@#$%^&*]/, "Doit contenir au moins un caractère spécial"),
});


const FormContainer = styled.div`
  display: flex;
  min-width: 400px;
  flex-direction: column;
  align-items: center;
  background-color: var(--color1); 
  color: var(--color5); 
  border-radius: 10px;
  gap: 5px;
  padding: 0 0 20px 0 ;

  @media (max-width: 767px) {
    min-width: 300px;
    padding: 16px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: var(--color4);
  color: var(--color5); 
  padding: 10px;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding: 10px;

  @media (max-width: 767px) {
    padding: 8px;
  }
`;

const StyledError = styled.div`
  color: var(--color3); // #EE2B47
  font-size: 14px;
  margin-top: 4px;
`;

const ProfileInfo = () => {
  const { user, signOut } = useAuthContext();
  const { userData, fetchUserData, updateUserData, deleteUser,isLoading } = useUserContext();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  // Initialisation des données utilisateur
  const initialValues: UserInfo = {
    email: userData?.email || user?.email || "",
    name: userData?.name || "",
    firstname: userData?.firstname || "",
    adress: userData?.adress || "",
    phone: userData?.phone || "",
    newPassword: "",
  };

  // Charger les données utilisateur au montage
  useEffect(() => {
    console.log("test fetch "+user + userData?.name+ isLoading )
    if (user && !userData) {
      fetchUserData();
      
    }
  }, [user, userData, fetchUserData,isLoading]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (values: UserInfo) => {
    setFormValues(values);
    setIsModalOpen(true);
  };

  // Gestion de la confirmation du mot de passe
  const handleConfirmPassword = async (password: string) => {
    if (formValues) {
      try {
        await updateUserData(
          password,
          formValues.newPassword,
          formValues.name,
          formValues.firstname,
          formValues.adress,
          formValues.phone
        );
        setIsModalOpen(false);
        alert("Profil mis à jour avec succès !");
      } catch (err: any) {
        setError(err.response?.data?.error || "Erreur lors de la mise à jour du profil");
      }
    }
  };

  
  const handleDelete = async () => {
    const password = prompt("Veuillez entrer votre mot de passe pour confirmer la suppression :");
    if (password) {
      const success = await deleteUser(password);
      if (success) {
        await signOut();
        alert("Compte supprimé avec succès !");
        navigate("/signin");
      } else {
        setError("Erreur lors de la suppression du compte");
      }
    }
  };

  return (
    <FormContainer>
      <TitleContainer>
        <h1 style={{ fontFamily: "Merriweather, serif" }}>Mes Informations Personnelles</h1>
      </TitleContainer>
      <p>Modifiez vos informations personnelles</p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (
          <FormikForm>
            <StyledForm>
              <CustomInput name="email" label="Email" type="email" ariaLabel="Entrez votre email" />
              <CustomInput name="name" label="Nom" type="text" ariaLabel="Entrez votre nom" />
              <CustomInput name="firstname" label="Prénom" type="text" ariaLabel="Entrez votre prénom" />
              <CustomInput name="adress" label="Adresse" type="text" ariaLabel="Entrez votre adresse" />
              <CustomInput name="phone" label="Téléphone" type="tel" ariaLabel="Entrez votre numéro" />
              <CustomInput
                name="newPassword"
                label="Nouveau mot de passe (optionnel)"
                type="password"
                ariaLabel="Entrez votre nouveau mot de passe"
              />
              <Button text="Mettre à jour" variant="type1" width="300px" type="submit" />
              <StyledError>{error}</StyledError>
            </StyledForm>
          </FormikForm>
        )}
      </Formik>
      <Button
        text="Supprimer le compte"
        variant="type2"
        width="300px"
        type="button"
        onClick={handleDelete}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError("");
        }}
        onConfirm={handleConfirmPassword}
        error={error}
      />
    </FormContainer>
  );
};

export default ProfileInfo;