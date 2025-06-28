import styled from "styled-components"; 
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Button from "./Button";

interface FormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
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

const Newsletter = () => {
  const handleSubmit = async (values: FormValues) => {
    console.log("Formulaire soumis !", values.email);
  };

  return (
    <NewsletterContainer>
      <p>Promis, pas de spam. </p>
        <p>Désinscription à tout moment.</p>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <FormikForm>
            <StyledForm>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Field
                        id="email-newletter"
                        name="email"
                        type="email"
                        as={Input}
                        aria-label="Entrez votre email"
                    />
                    <ErrorMessage name="email" component={StyledError} />
                </div>

                <Button
                text="S’abonner"
                variant="type1"
                width="300px"
                type="submit" 
                onClick={() => {}}
                />
            </StyledForm>

          </FormikForm>
        )}
      </Formik>
    </NewsletterContainer>
  );
};

export default Newsletter;
