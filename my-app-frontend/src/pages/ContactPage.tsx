import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Button from "../components/Button";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import axios from "../services/axios";
import { useState } from "react";


type Category = 'general' | 'order' | 'technical'| 'account' | 'feedback'| 'refund' | 'security';
interface FormValues {
  category : Category
  email: string;
  phone?: string;
  subject: string;
  description:string
}

const validationSchema = Yup.object({
  category: Yup. string()
    .required('Le nom est obligatoire')
    .min(2,'Nom trop court !')
    .max(64, 'Nom trop long !'),
  email: Yup.string()
      .required('L\'email est obligatoire')
      .email('Format d\'email invalide')
      .max(64, 'Email trop long !'),
  phone: Yup. string().notRequired()
    .matches(/^[0-9]{10}$/, 'Numéro invalide !'),
  subject: Yup. string()
    .required('Le sujet est obligatoire')
    .min(2,'Sujet trop court !')
    .max(64, 'Sujet trop long !'),
  description: Yup. string()
    .required('Le description est obligatoire')
    .min(2,'Description trop courte !')
    .max(64, 'Description trop longue !'),
});
const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :var(--color2);
`;
const FormContainer = styled.div`
    display:flex;
    min-width: 400px;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :var(--color1);
    color:var(--color5);
    border-radius: 10px;
    gap:10px;
    padding-bottom: 20px;
`;
const TitleContainer = styled.div`
    display:flex;
    height: 60px;
    width: 100%;
    align-items:center;
    justify-content:center;
    background-color :var(--color4);
    color:var(--color5);
`;




const StyledForm = styled.div`
  display: flex;
  background-color: var(--color1);
  flex-direction: column;
  align-items:start;
  height:auto;
  gap: 20px;
  padding: 10px ;
`;


const Input2 = styled.select`
    width:300px;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  background-color: var(--color5);
  color: var(--color4);
  border: none;
`;
const Input3 = styled.textarea`
    width:300px;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  background-color: var(--color5);
  color: var(--color4);
  border: none;
  resize: none;
`;
const Label = styled.label`
  color: var(--color5);
  display: block;
  margin-bottom: 4px;
`;
const StyledError = styled.div`
  color: var(--color3);
  font-size: 14px;
  margin-top: 4px;
`;






const ContactPage = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (values: FormValues) => {
    console.log("Formulaire soumis !", values.email);
    try {
        await axios.post("/contact", values); 
      } catch (err: any) {
        setError("Une erreur est survenue.");
    }
  };
    return (      
      <>
        <Header reduce={true}/>
        <PageContainer>
          <FormContainer>
            <TitleContainer>
              <h1>Nous contacter</h1>
            </TitleContainer>
                <p>Remplissez le formulaire pour nous contacter.</p>
                <Formik              
                  key="informations-step" 
                  initialValues={{ category: 'general',email: '',phone: '',subject: '',description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <FormikForm>
                      <StyledForm>                  
                          <div>
                              <Label htmlFor="category">Veuillez sélectionner une catégorie</Label>
                              <Field id="category" name="category" as={Input2} aria-label="Choisissez une catégorie">
                                <option value="general">Demande générale</option>
                                <option value="order">Suivi de commande</option>
                                <option value="technical">Problème technique</option>
                                <option value="account">Mon compte</option>
                                <option value="feedback">Retour sur le site</option>
                                <option value="refund">Remboursement / Réclamation</option>
                                <option value="security">Signalement de sécurité</option>
                              </Field>
                              <ErrorMessage name="category" component={StyledError} />
                              
                              <CustomInput name="email" label="Email" type="email" ariaLabel="Entrez votre email"/>  
                              <CustomInput name="phone" label="Téléphone (facultatif)" type="tel" ariaLabel="Entrez votre numéro"/>
                              <CustomInput name="subject" label="Sujet" type="text" ariaLabel="Entrez votre sujet"/>       
                              
                              <Label htmlFor="description">Description</Label>
                              <Field
                                  id="description"
                                  name="description"
                                  type="text"
                                  as={Input3}
                                  aria-label="Entrez votre description"
                                  rows="4"
                              />
                              <ErrorMessage name="description" component={StyledError} />

                                                                                                           
                          </div>
                            <StyledError >{error}</StyledError>
                          <Button
                            text="Envoyer"
                            variant="type1"
                            width="300px"
                            type="submit" 
                          />
                      </StyledForm>

                    </FormikForm>
                  )}
                </Formik>
          </FormContainer>
        </PageContainer>      
      </>
    );
  };

  export default ContactPage;