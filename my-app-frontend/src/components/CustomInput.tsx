import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

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

interface Props {
  name: string;
  label: string;
  type?: string;
  as?: any;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
}

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
  @media  screen and (max-width: 768px) {
    width: 250px;
  }
`;

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
      <Field
        id={inputId}
        name={name}
        type={type}
        as={as}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
      />
      <ErrorMessage name={name} component={StyledError} />
    </div>
  );
};

export default CustomInput;
