import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm} from 'formik';
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";

interface FormValues1 {
  email: string;
}
interface FormValues2 {
  password: string;
}
const validationSchema1 = Yup.object({
  email: Yup.string()
      .required('L\'email est obligatoire')
      .email('Format d\'email invalide')
      .max(64, 'Email trop long !'),
});


const validationSchema2 = Yup.object({
  password: Yup.string()
      .required('Le mot de passe est obligatoire')
      .min(12, '12 caractères minimum')
      .max(64, 'Mot de passe trop long !')
      .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
      .matches(/[a-z]/, 'Doit contenir au moins une minuscule')
      .matches(/\d/, 'Doit contenir au moins un chiffre')
      .matches(/[!@#$%^&*]/, 'Doit contenir au moins un caractère spécial'),
});

const PageContainer = styled.main`
    min-height:calc(100vh - 60px);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    background-color :var(--color2);
    color:var(--color5);
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


const SignInPage = () => {
  const [emailVerified,setEmailVerified] = useState(false);
  const navigate = useNavigate()
  const handleSubmitEmail = async (values: FormValues1) => {
    console.log("Formulaire soumis !", values.email);

    //pour le test//
    setEmailVerified(true)
  };
  const handleSubmitPassword = async (values: FormValues2) => {
    console.log("Formulaire soumis !", values.password);

    //pour le test//
    setEmailVerified(true)
  };
    return (
      <>
        <Header reduce={true}/>  
        <PageContainer>
          
          <IndicatorContainer>
            <StyledIndicator isActive={!emailVerified}></StyledIndicator>
            <StyledIndicator isActive={emailVerified}></StyledIndicator>
          </IndicatorContainer>
          <FormContainer>
            <TitleContainer>
              <h1>Connexion</h1>
            </TitleContainer>
            {!emailVerified?(
              <>
                <p>Saisissez votre e-mail pour vous connecter.</p>
                <Formik
                  key="email-step" 
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema1}
                  onSubmit={handleSubmitEmail}
                >
                  {() => (
                    <FormikForm>
                      <StyledForm>  
                        <CustomInput name="email" label="Email" type="email" ariaLabel="Entrez votre email"/>  
                        <Button  text="Continuer" variant="type1" width="300px" type="submit" />
                      </StyledForm>
                    </FormikForm>
                  )}
                </Formik>
                <DividerWithText><h3>Nouveau client ?</h3></DividerWithText>
                
                <Button text="Créer un compte" variant="type3" onClick={()=>(navigate('/signup'))}></Button>
              </>
            ):(
              <>
                <p>Saisissez votre mot de passe pour vous connecter</p>
                <Formik              
                  key="password-step" 
                  initialValues={{ password: '' }}
                  validationSchema={validationSchema2}
                  onSubmit={handleSubmitPassword}
                >
                  {() => (
                    <FormikForm>
                      <StyledForm>    
                          <CustomInput name="password" label="Mot de passe" type="password" ariaLabel="Entrez votre mot de passe"/>                
                          <Button text="Se connecter" variant="type1" width="300px" type="submit" />
                      </StyledForm>
                    </FormikForm>
                  )}
                </Formik>
                <Button
                    text="Modifier l’email"
                    variant="type2"
                    width="300px"
                    type="button" 
                    onClick={()=>(setEmailVerified(false))}
                  />
              </>
            )}

          </FormContainer>
          

        </PageContainer>
      </>    
      

    );
  };

  export default SignInPage;