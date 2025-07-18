import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";

export type FieldType = "text" | "textarea" | "number" | "select" | "checkbox";

export interface ModalField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  fields: ModalField[];
  onSubmit: (values: any) => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: var(--color1);
  color: var(--color5);
  padding: 24px;
  border-radius: 10px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  background: var(--color5);
  color: var(--color1);
  border: none;
`;

const Select = styled(Field)`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  background: var(--color5);
  color: var(--color1);
  border: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ErrorText = styled.div`
  color: var(--color3);
  font-size: 13px;
`;

const AddModal = ({ isOpen, onClose, title, fields, onSubmit }: AddModalProps) => {
  if (!isOpen) return null;

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {} as any);

  const validationSchema = Yup.object(
    fields.reduce((shape, field) => {
      if (field.required) {
        shape[field.name] =
          field.type === "number"
            ? Yup.number().required("Ce champ est requis")
            : Yup.string().required("Ce champ est requis");
      }
      return shape;
    }, {} as Record<string, any>)
  );

  return (
    <Overlay>
      <ModalContent>
        <h2>{title || "Ajouter"}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          <Form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {fields.map((field) => (
              <div key={field.name}>
                {field.type !== "checkbox" && <Label htmlFor={field.name}>{field.label}</Label>}

                {field.type === "text" || field.type === "number" ? (
                  <Input id={field.name} name={field.name} type={field.type} />
                ) : field.type === "textarea" ? (
                  <Input id={field.name} name={field.name} as="textarea" />
                ) : field.type === "select" ? (
                  <Select as="select" id={field.name} name={field.name}>
                    <option value="">Choisir...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                ) : field.type === "checkbox" ? (
                  <CheckboxWrapper>
                    <Field id={field.name} name={field.name} type="checkbox" />
                    <Label htmlFor={field.name}>{field.label}</Label>
                  </CheckboxWrapper>
                ) : null}

                <ErrorMessage name={field.name} component={ErrorText} />
              </div>
            ))}

            <div style={{ display: "flex" ,flexDirection:"column", gap: 10, padding:10 }}>
              <Button text="Ajouter" type="submit" variant="type1" width="100%" />
              <Button text="Annuler" type="button" variant="type2" width="100%" onClick={onClose} />
            </div>
          </Form>
        </Formik>
      </ModalContent>
    </Overlay>
  );
};

export default AddModal;
