import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import Button from "../components/Button";
import CustomInput from "../components/CustomInput";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  error: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--color1); // #34374C
  color: var(--color5); // #F6F6F6
  border-radius: 10px;
  padding: 20px;
  max-width: 90%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 767px) {
    padding: 16px;
  }
`;

const ModalTitle = styled.h3`
  font-size: 22px;
  color: var(--color5); // #F6F6F6
  margin: 0;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const validationSchema = Yup.object({
  password: Yup.string()
      .required('Le mot de passe est obligatoire')
      .min(12, '12 caractères minimum')
      .max(64, 'Mot de passe trop long !')
      .matches(/[A-Z]/, 'Doit contenir au moins une majuscule')
      .matches(/[a-z]/, 'Doit contenir au moins une minuscule')
      .matches(/\d/, 'Doit contenir au moins un chiffre')
      .matches(/[!@#$%^&*]/, 'Doit contenir au moins un caractère spécial'),
});

const Modal = ({ isOpen, onClose, onConfirm, error }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirmez votre mot de passe</ModalTitle>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onConfirm(values.password);
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <StyledForm>
                <CustomInput
                  name="password"
                  label="Mot de passe actuel"
                  type="password"
                  ariaLabel="Entrez votre mot de passe actuel"
                />
                <StyledError>{error}</StyledError>
                  <Button
                    text="Confirmer"
                    variant="type1"
                    type="submit"
                    disabled={isSubmitting}
                  />
                  <Button
                    text="Annuler"
                    variant="type2"
                    type="button"
                    onClick={onClose}
                  />
              </StyledForm>
            </FormikForm>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;