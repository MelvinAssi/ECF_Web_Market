import { Field, ErrorMessage } from "formik";
import styled from "styled-components";
import DOMPurify from "dompurify";
import React from "react";

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

const Input = styled.input`
  width: 300px;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  background-color: var(--color5);
  color: var(--color4);
  border: 2px solid transparent;
  &:focus {
    border-color: var(--color3);
    outline: none; 
  }
  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

interface Props {
  name: string;
  label: string;
  type?: string;
  as?: React.ElementType; 
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
}

const CustomInput = ({
  name,
  label,
  type = "text",
  as = Input,
  id,
  placeholder,
  ariaLabel,
}: Props) => {
  const inputId = id || name;

  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>

      <Field name={name}>
        {({ field, form }: any) => {
          const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            let value = e.target.value;


            if (
              type === "text" ||
              as === "textarea" ||
              (typeof as === "object" && (as as any).styledComponentId)
            ) {
              value = DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
            }

            form.setFieldValue(name, value);
          };

          return React.createElement(as, {
            ...field,
            id: inputId,
            type,
            placeholder,
            "aria-label": ariaLabel || label,
            onChange: handleChange,
          });
        }}
      </Field>

      <ErrorMessage name={name} component={StyledError} />
    </div>
  );
};

export default CustomInput;
