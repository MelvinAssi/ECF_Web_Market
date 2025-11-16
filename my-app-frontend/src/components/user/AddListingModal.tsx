import styled from "styled-components";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import CustomInput from "../CustomInput";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { convertAndUploadToFirebase } from "../../services/firebaseFunctions"; 

// ---- STYLED ----
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
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

const TextArea = styled.textarea`
  width: 300px;
  border-radius: 6px;
  padding: 10px;
  background-color: var(--color5);
  color: var(--color4);
  border: 2px solid transparent;
  resize: none;

  &:focus {
    border-color: var(--color3);
    outline: none;
  }
`;

const StyledError = styled.div`
  color: var(--color3);
  font-size: 13px;
`;

const FileLabel = styled.label`
  padding: 8px;
  background: var(--color5);
  color: var(--color4);
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Select = styled.select`
  width: 300px;
  padding: 8px;
  background: var(--color5);
  color: var(--color4);
  border-radius: 6px;
  font-size: 16px;
`;
const STRIPE_FIXED_FEE = 0.25;
const TECHREUSE_FEE_RATE = 0.10;

const calculateNetSellerAmount = (price: number) => {
  const net = (price - STRIPE_FIXED_FEE) *(1-TECHREUSE_FEE_RATE);
  return Math.round(net * 100) / 100;
};

// ---- VALIDATION ----
const validationSchema = Yup.object({
  name: Yup.string().required("Nom requis"),
  description: Yup.string().required("Description requise"),
  price: Yup.number().required("Prix requis").min(0),
  condition: Yup.string().oneOf(["NEW", "GOOD", "USED"]).required("État requis"),
  category_id: Yup.string().uuid().required("Catégorie requise"),
  images: Yup.mixed().test("file-required", "Une image est requise", (value: unknown) => {
      if (!value || typeof value !== "object") return false;
      if (Array.isArray(value)) return value.length > 0;
      if (value instanceof FileList) return value.length > 0;
      if (value instanceof File) return true;
      return false;
    }),
});

// ---- PROPS ----
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddListingModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category");
      setCategoryList(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Nouvelle annonce</h2>

        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            condition: "",
            category_id: "",
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const urls = await Promise.all(
                Array.from(values.images).map((file: File) => convertAndUploadToFirebase(file))
              );
              await axios.post("/product", {
                name: values.name,
                description: values.description,
                price: values.price,
                condition: values.condition,
                images: urls,
                category_id: values.category_id,  
              });

              onSuccess();
              onClose();
            } catch (err) {
              console.error("Erreur envoi produit :", err);
              alert("Erreur lors de la création.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <FormikForm>
              <StyledForm>
                <CustomInput name="name" label="Nom" type="text" />
                <CustomInput name="price" label={"Prix (€) TTC" } type="number" />
                {values.price && (
                  <div style={{ fontSize: "14px", color: "var(--color5)" }}>
                    <strong>Vous toucherez environ :</strong> {calculateNetSellerAmount(parseFloat(values.price))} €
                  </div>
                )}
                <CustomInput name="description" label="Description"as={TextArea}  placeholder="Description..." />


                <Field as={Select} name="condition">
                  <option value="">État du produit</option>
                  <option value="NEW">Neuf</option>
                  <option value="GOOD">Bon état</option>
                  <option value="USED">Usé</option>
                </Field>
                <ErrorMessage name="condition" component={StyledError} />

                <Field as={Select} name="category_id">
                  <option value="">Choisissez une catégorie</option>
                  {categoryList.map((cat: any) => (
                    <option key={cat.id_category} value={cat.id_category}>
                      {cat.name_category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category_id" component={StyledError} />

                {/* IMAGE UPLOAD */}
                <Field name="images">
                  {() => (
                    <>
                      <HiddenFileInput
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.currentTarget.files;
                          if (files) setFieldValue("images", files);
                        }}
                      />
                      <FileLabel htmlFor="images">Ajouter des images</FileLabel>
                      {values.images?.length > 0 && (
                        <ul style={{ fontSize: "13px" }}>
                            {Array.from(values.images).map((file: File, index: number) => (
                              <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                      )}
                    </>
                  )}
                </Field>
                <ErrorMessage name="images" component={StyledError} />

                <div style={{ display: "flex",flexDirection:"column",padding:10, gap: 10 }}>
                  <Button text="Valider" variant="type1" type="submit" />
                  <Button text="Annuler" variant="type2" type="button" onClick={onClose} />
                </div>
              </StyledForm>
            </FormikForm>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddListingModal;
