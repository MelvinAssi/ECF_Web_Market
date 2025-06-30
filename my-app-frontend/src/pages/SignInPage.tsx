import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm} from 'formik';
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import { useAuthContext } from "../hooks/useAuthContext";

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
  const StyledError = styled.div`
    color: var(--color3);
    font-size: 14px;
    margin-top: 4px;
`;


const SignInPage = () => {
  const {checkEmailExistence,signIn} = useAuthContext()
  const [checkedEmail,setCheckedEmail] = useState(false);
  const [formData, setFormData] = useState({ email: ''});
  const navigate = useNavigate()
  const [error, setError] = useState('');

  const handleEmailCheck = async (values: FormValues1) => {
    try {
      const isAvailable = await checkEmailExistence(values.email);
      if (isAvailable) {
        alert('Cet email est enregistré, passez à l\'étape suivante');
        setFormData({ email: values.email});
        setCheckedEmail(true)
      } else {
        setError('Cet email n\'est pas enregistré');
      }
    } catch (err) {
      setError('Erreur lors de la vérification de l\'email');
    }
  };
  const handleSignIn = async (values: FormValues2) => {
    try {
      await signIn(formData.email, values.password);
      alert('Connexion réussie !');
    } catch (err) {
      setError('Erreur lors de la connexion');
    }
  };
    return (
      <>
        <Header reduce={true}/>  
        <PageContainer>
          
          <IndicatorContainer>
            <StyledIndicator isActive={!checkedEmail}></StyledIndicator>
            <StyledIndicator isActive={checkedEmail}></StyledIndicator>
          </IndicatorContainer>
          <FormContainer>
            <TitleContainer>
              <h1>Connexion</h1>
            </TitleContainer>
            {!checkedEmail?(
              <>
                <p>Saisissez votre e-mail pour vous connecter.</p>
                <Formik
                  key="email-step" 
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema1}
                  onSubmit={handleEmailCheck}
                >
                  {() => (
                    <FormikForm>
                      <StyledForm>  
                        <CustomInput name="email" label="Email" type="email" ariaLabel="Entrez votre email"/>  
                        <Button  text="Continuer" variant="type1" width="300px" type="submit" />
                        <StyledError>{error}</StyledError>
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
                  onSubmit={handleSignIn}
                >
                  {() => (
                    <FormikForm>
                      <StyledForm>    
                          <CustomInput name="password" label="Mot de passe" type="password" ariaLabel="Entrez votre mot de passe"/>                
                          <Button text="Se connecter" variant="type1" width="300px" type="submit" />
                          <StyledError>{error}</StyledError>
                      </StyledForm>
                    </FormikForm>
                  )}
                </Formik>
                <Button
                    text="Modifier l’email"
                    variant="type2"
                    width="300px"
                    type="button" 
                    onClick={()=>(setCheckedEmail(false))}
                  />
              </>
            )}

          </FormContainer>
          

        </PageContainer>
      </>    
      

    );
  };

  export default SignInPage;