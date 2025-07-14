// components/admin/SearchBar.tsx
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps<T> {
  search: string;
  onSearchChange: (value: string) => void;
  fields: { key: keyof T; label: string }[];
  selectedField: keyof T;
  onFieldChange: (key: keyof T) => void;
}

const SearchBarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 6px;
  background-color: var(--color5);
  border: 1px solid var(--color4);
  color: var(--color1);
`;

const Input = styled.input`
  padding: 8px;
  flex: 1;
  border-radius: 6px;
  background-color: var(--color5);
  border: 1px solid var(--color4);
  color: var(--color1);
`;

const SearchBar = <T,>({ search, onSearchChange, fields, selectedField, onFieldChange }: SearchBarProps<T>) => (
  <SearchBarContainer>
    <StyledSelect value={selectedField as string} onChange={(e) => onFieldChange(e.target.value as keyof T)}>
      {fields.map((f) => (
        <option key={f.key as string} value={f.key as string}>{f.label}</option>
      ))}
    </StyledSelect>
    <Input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Rechercher..."
    />
    <FontAwesomeIcon icon={faSearch} color="#34374C" />
  </SearchBarContainer>
);

export default SearchBar;
