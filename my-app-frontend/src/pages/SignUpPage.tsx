import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues1 {
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormValues2 {
  name: string;
  firstname: string;
  adress: string;
  phone: string;
}
const validationSchema1 = Yup.object({
  email: Yup.string()
      .required('L\'email est obligatoire')
      .email('Format d\'email invalide')
      .max(64, 'Email trop long !'),
  password: Yup.string()
      .required('Le mot de passe est obligatoire')
      .min(12, '12 caractères minimum')
      .max(64, 'Mot de passe trop long !')
      .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
      .matches(/[a-z]/, 'Doit contenir au moins une minuscule')
      .matches(/\d/, 'Doit contenir au moins un chiffre')
      .matches(/[!@#$%^&*]/, 'Doit contenir au moins un caractère spécial'),
  confirmPassword : Yup.string()
            .required('La confirmation de mot de passe est obligatoire')
            .oneOf([Yup.ref('password')], 'Les mots de passes doient être identiques')
});


const validationSchema2 = Yup.object({
    name: Yup. string()
      .required('Le nom est obligatoire')
      .min(2,'Nom trop court !')
      .max(64, 'Nom trop long !'),
    firstname: Yup. string()
      .required('Le prénom est obligatoire')
      .min(2,'Prénom trop court !')
      .max(64, 'Prénom trop long !'),
    adress: Yup. string()
      .required("L'adresse est obligatoire")
      .min(2,'Addresse trop court !')
      .max(64, 'Addresse trop long !'),
    phone: Yup. string()
      .required('Le numéro est obligatoire')
      .matches(/^[0-9]{10}$/, 'Numéro invalide !'),
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

const Input = styled.input`
    width:300px;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  background-color: var(--color5);
  color: var(--color4);
  border: none;
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

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap:12px;
  padding: 20px;
`;

interface StyledIndicatorProps {
  isActive: boolean;
}
const StyledIndicator = styled.div<StyledIndicatorProps>`
  width : 12px;
  height: 12px;
  border-radius: 6px;
  background-color:${({ isActive }) => (isActive ? 'var(--color3)' : 'var(--color4)')};
`;
const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--color5);
  width: 300px;
  margin: 20px 0;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color5);
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
  `;


const SignUpPage = () => {
  const [emailVerified,setEmailVerified] = useState(false);
  const navigate = useNavigate()
  const handleSubmitEmail = async (values: FormValues1) => {
    console.log("Formulaire soumis !", values.email);

    //pour le test//
    setEmailVerified(true)
  };
  const handleSubmitPassword = async (values: FormValues2) => {
    console.log("Formulaire soumis !", values.name);

    //pour le test//
    setEmailVerified(true)
  };

    return (      
      <PageContainer>
        <IndicatorContainer>
          <StyledIndicator isActive={!emailVerified}></StyledIndicator>
          <StyledIndicator isActive={emailVerified}></StyledIndicator>
        </IndicatorContainer>
        <FormContainer>
          <TitleContainer>
            <h1>Inscription</h1>
          </TitleContainer>
          {!emailVerified?(
            <>
              <p>Créez votre compte pour commencer..</p>
              <Formik
                key="email-step" 
                initialValues={{ email: '',password: '',confirmPassword: '' }}
                validationSchema={validationSchema1}
                onSubmit={handleSubmitEmail}
              >
                {() => (
                  <FormikForm>
                    <StyledForm>                  
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                as={Input}
                                aria-label="Entrez votre email"
                            />
                            <ErrorMessage name="email" component={StyledError} />
                            <Label htmlFor="password">Mot de passe</Label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                as={Input}
                                aria-label="Entrez votre mot de passe"
                            />
                            <ErrorMessage name="password" component={StyledError} />   
                             
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                as={Input}
                                aria-label="Confirmer votre mot de passe"
                            />
                            <ErrorMessage name="confirmPassword" component={StyledError} />                                                    
                        </div>

                        <Button
                          text="Continuer"
                          variant="type1"
                          width="300px"
                          type="submit" 
                        />
                    </StyledForm>

                  </FormikForm>
                )}
              </Formik>
              <DividerWithText><h3>Déjà client ?</h3></DividerWithText>
              
              <Button text="Créer un compte" variant="type3" onClick={()=>(navigate('/signin'))}></Button>
            </>
          ):(
            <>
              <p>Saisissez votre mot de passe pour vous connecter</p>
              <Formik              
                key="informations-step" 
                initialValues={{ name: '',firstname: '',adress: '',phone: '' }}
                validationSchema={validationSchema2}
                onSubmit={handleSubmitPassword}
              >
                {() => (
                  <FormikForm>
                    <StyledForm>                  
                        <div>
                            <Label htmlFor="name">Nom</Label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                as={Input}
                                aria-label="Entrez votre nom"
                            />
                            <ErrorMessage name="name" component={StyledError} />

                            <Label htmlFor="firstname">Prénom</Label>
                            <Field
                                id="firstname"
                                name="firstname"
                                type="firstname"
                                as={Input}
                                aria-label="Entrez votre prénom"
                            />
                            <ErrorMessage name="firstname" component={StyledError} />

                            <Label htmlFor="adress">Adresse</Label>
                            <Field
                                id="adress"
                                name="adress"
                                type="text"
                                as={Input}
                                aria-label="Entrez votre adresse"
                            />
                            <ErrorMessage name="adress" component={StyledError} />

                            <Label htmlFor="phone">Télephone</Label>
                            <Field
                                id="phone"
                                name="phone"
                                type="tel"
                                as={Input}
                                aria-label="Entrez votre numéro"
                                pattern="[0-9]{10}"
                            />
                            <ErrorMessage name="phone" component={StyledError} />
                        </div>

                        <Button
                          text="Créer le compte"
                          variant="type1"
                          width="300px"
                          type="submit" 
                        />
                    </StyledForm>

                  </FormikForm>
                )}
              </Formik>
              <Button
                  text="Modifier les informations"
                  variant="type2"
                  width="300px"
                  type="button" 
                  onClick={()=>(setEmailVerified(false))}
                />
            </>
          )}

        </FormContainer>
      </PageContainer>
    );
  };

  export default SignUpPage;