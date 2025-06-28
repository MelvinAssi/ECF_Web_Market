import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues1 {
  email: string;
}
interface FormValues2 {
  password: string;
}
const validationSchema1 = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});


const validationSchema2 = Yup.object({
  password: Yup.string()
    .min(12, 'Password must be at least 12 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/\d/, 'Password must contain a number')
    .required('Password is required'),
});

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
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
                        <div>
                            <Label htmlFor="password">Mot de passe</Label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                as={Input}
                                aria-label="Entrez votre mot de passe"
                            />
                            <ErrorMessage name="password" component={StyledError} />
                        </div>

                        <Button
                          text="Se connecter"
                          variant="type1"
                          width="300px"
                          type="submit" 
                        />
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
    );
  };

  export default SignInPage;