import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import axios from "../../services/axios";
import { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import Button from "../../components/Button";

const validationSchema = Yup.object({
  text: Yup.string()
    .required("Le text est obligatoire")
    .min(2, "Text trop court !")
    .max(64, "Text trop long !"),
  star: Yup.number()
    .required("Le etole est obligatoire")
    .min(0, "etole trop court !")
    .max(5, "etole trop long !"),
});


interface Review {
  id: string;
  user: User;
  text: string;
  star: number;
}
interface User{
  name:string;
  firstname:string
}
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;
const FormContainer = styled.div`
  display: flex;
  min-width: 400px;
  width: 40%;
  flex-direction: column;
  align-items: center;
  background-color: var(--color1); 
  color: var(--color5); 
  border-radius: 10px;
  gap: 5px;
  padding: 0 0 20px 0 ;

  @media (max-width: 767px) {
    min-width: 300px;
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


const UserReviewsPage = () => {
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    fetchMyReview();
  }, []);

  const fetchMyReview = async () => {
    try {
      const res = await axios.get("/review/me");
      setReview(res.data);
    } catch (err) {
      setReview(null); // Aucun avis trouvé
    }
  };

  const initialValues = {
    text: review?.text || "",
    star: review?.star || 5,
  };

  const handleSubmit = async (values: { text: string; star: number }) => {
    console.log("submit",values.text)
    try {
      if (review) {
        await axios.put("/review", values); // modifier
        setSuccess("Avis mis à jour !");
      } else {        
        await axios.post("/review", values); // créer
        setSuccess("Avis ajouté !");
      }
      fetchMyReview(); // recharger
    } catch (err: any) {
      setError("Une erreur est survenue.");
    }
  };

  const handleDelete = async () => {
    console.log("delete")
    try {
      await axios.delete("/review");
      setReview(null);
      setSuccess("Avis supprimé.");
    } catch (err) {
      setError("Échec de la suppression.");
    }
  };

  return (
    <UserLayout>
      <PageWrapper>
        <FormContainer>
          <TitleContainer>
            <h1>{review ? "Modifier votre avis" : "Écrire un avis"}</h1>
          </TitleContainer>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <FormikForm>
                <StyledForm>
                  <CustomInput
                    name="text"
                    label="Votre avis"
                    placeholder="Partagez votre expérience"
                    ariaLabel="Écrivez votre avis"
                  />
                  <CustomInput
                    type="number"
                    name="star"
                    label="Note (0-5)"
                    placeholder="Notez le service"
                    ariaLabel="Notez de 0 à 5"
                  />
                  <Button text={review ? "Mettre à jour" : "Envoyer"} variant="type1" width="300px" type="submit" />
                  {success && <div style={{ color: "green" }}>{success}</div>}
                  {error && <StyledError>{error}</StyledError>}
                </StyledForm>
              </FormikForm>
            )}
          </Formik>

          {review && (
            <Button
              text="Supprimer l'avis"
              variant="type2"
              width="300px"
              type="button"
              onClick={handleDelete}
            />
          )}
        </FormContainer>
      </PageWrapper>
    </UserLayout>
  );
};

export default UserReviewsPage;
