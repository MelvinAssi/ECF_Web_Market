import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import Button from "./Button";
import CustomInput from "./CustomInput";

interface FormValues {
  email_newletter: string;
}

const validationSchema = Yup.object({
  email_newletter: Yup.string()
    .email('Veuillez entrer un email valide')
    .required('Email requis'),
});

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:auto;
  overflow-y: hidden;
`;
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items:start;
  height:auto;
  gap: 20px;
  padding: 10px ;
`;


const Newsletter = () => {
  const handleSubmit = async (values: FormValues) => {
    alert("Formulaire soumis !"+ values.email_newletter);
  };

  return (
    <NewsletterContainer>
      <p>Promis, pas de spam. </p>
        <p>Désinscription à tout moment.</p>
      <Formik
        initialValues={{ email_newletter: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <FormikForm>
            <StyledForm>
                <CustomInput
                  id="email_newletter"
                  name="email_newletter"
                  label="Email"
                  type="email"
                  ariaLabel="Entrez votre email"
                />

                <Button
                text="S’abonner"
                variant="type1"
                width="300px"
                type="submit" 
                />
            </StyledForm>

          </FormikForm>
        )}
      </Formik>
    </NewsletterContainer>
  );
};

export default Newsletter;
