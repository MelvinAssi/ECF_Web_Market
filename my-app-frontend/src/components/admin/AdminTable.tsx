import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Field<T> {
  key: string;
  label: string;
}

interface AdminTableProps<T> {
  data: T[];
  fields: Field<T>[];
  rowIdKey: keyof T;
  onDeleteClick: (ids: string[]) => void;
  onEditClick: (id: string) => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: var(--color5);
  color: var(--color1);
`;

const Th = styled.th`
  padding: 12px;
  background-color: var(--color4);
  color: var(--color5);
  text-align: left;
  border-bottom: 2px solid var(--color2);
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--color2);
`;

const Tr = styled.tr`
  &:hover {
    background-color: var(--color3);
    color: var(--color5);
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 10px;
  padding:10px;
`;

const AdminTable = <T,>({
  data,
  fields,
  rowIdKey,
  onDeleteClick,
  onEditClick,
}: AdminTableProps<T>) => {
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const getNestedValue = (obj: any, path: string): any =>
    path.split(".").reduce((acc, part) => acc?.[part], obj);

  return (
    <>
      <ActionBar>
        {isCheck.length === 1 && (
          <Button
            width="40px"
            variant="type2"
            text={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => onEditClick(isCheck[0])}
          />
        )}
        {isCheck.length > 0 && (
          <Button
            width="40px"
            variant="type1"
            text={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => onDeleteClick(isCheck)}
          />
        )}
      </ActionBar>

      <Table>
        <thead>
          <tr>
            <Th>
              <input
                style={{ accentColor: "var(--color3)", cursor: "pointer" }}
                type="checkbox"
                onChange={(e) =>
                  setIsCheck(
                    e.target.checked
                      ? data.map(d => String(d[rowIdKey]))
                      : []
                  )
                }
                checked={isCheck.length === data.length && data.length > 0}
              />
            </Th>
            {fields.map((field) => (
              <Th key={field.key}>{field.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const id = String(item[rowIdKey]);
            return (
              <Tr key={id}>
                <Td>
                  <input
                    style={{ accentColor: "var(--color4)", cursor: "pointer" }}
                    type="checkbox"
                    id={id}
                    onChange={handleClick}
                    checked={isCheck.includes(id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Td>
                {fields.map((field) => (
                  <Td key={field.key}>
                    {String(getNestedValue(item, field.key))}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminTable;
