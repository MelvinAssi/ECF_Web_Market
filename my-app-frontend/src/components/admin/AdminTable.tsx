  import styled from "styled-components";
  import { useState } from "react";
  import Button from "../Button";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faAdd, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

  export interface Field<T> {
    key: string;
    label: string;
    editable?: boolean;
    type?: 'text' | 'number'|'textarea' | 'select' | 'boolean';
    options?: { label: string; value: any }[];
  }

  interface AdminTableProps<T> {
    data: T[];
    fields: Field<T>[];
    rowIdKey: keyof T;
    onDeleteClick: (ids: string[]) => void;
    onUpdateClick?: (id: string, updatedValues: Partial<T>) => void;
    onAddClick?: () => void;
    addButton?: boolean;
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
    padding: 10px;
  `;
  const Input= styled.input`
    border: none;
    font-size: 16px;

  `
  const TextArea = styled.textarea`
  border: none;
  font-size: 16px;
  width: 200px;
  resize: none;
  min-height: 60px;
`;

  const AdminTable = <T extends Record<string, any>>({
  data,
  fields,
  rowIdKey,
  onDeleteClick,
  onUpdateClick,
  onAddClick,
  addButton = false,
}: AdminTableProps<T>) => {
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Partial<T>>({});

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck(prev => (checked ? [...prev, id] : prev.filter(item => item !== id)));
  };

  const getNestedValue = (obj: any, path: string): any =>
    path.split(".").reduce((acc, part) => acc?.[part], obj);

  return (
    <>
      <ActionBar>
        {addButton && (
          <Button
            width="40px"
            variant="type1"
            text={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => onAddClick?.()}
          />
        )}
        {editingId && (
          <Button
            width="40px"
            variant="type1"
            text={<FontAwesomeIcon icon={faSave} />}
            onClick={() => {
              if (onUpdateClick && editingId) {
                onUpdateClick(editingId, tempValues);
                setEditingId(null);
                setTempValues({});
              }
            }}
          />
        )}
        {!editingId && isCheck.length > 0 && (
          <Button
            width="40px"
            variant="type3"
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
                disabled={editingId !== null}
                style={{ accentColor: "var(--color3)", cursor: "pointer" }}
                type="checkbox"
                onChange={(e) =>
                  setIsCheck(
                    e.target.checked ? data.map(d => String(d[rowIdKey])) : []
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
            const isEditing = editingId === id;

            return (
              <Tr key={id}>
                <Td>
                  <input
                    disabled={editingId !== null}
                    style={{ accentColor: "var(--color4)", cursor: "pointer" }}
                    type="checkbox"
                    id={id}
                    onChange={handleClick}
                    checked={isCheck.includes(id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Td>
                {fields.map((field) => {
                  const value = getNestedValue(item, field.key);
                  const tempValue = tempValues[field.key] ?? value;

                  return (
                    <Td key={field.key}>
                      {isEditing && field.editable ? (
                        field.type === 'boolean' ? (
                          <input
                            type="checkbox"
                            checked={!!tempValue}
                            onChange={(e) =>
                              setTempValues(prev => ({
                                ...prev,
                                [field.key]: e.target.checked,
                              }))
                            }
                          />
                        ) : field.type === 'select' && field.options ? (
                          <select
                            value={tempValue}
                            onChange={(e) =>
                              setTempValues(prev => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                          >
                            {field.options.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <TextArea
                            value={tempValue ?? ""}
                            onChange={(e) =>
                              setTempValues(prev => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                          />
                        ):(
                          <Input
                            type={field.type || 'text'}
                            value={tempValue ?? ""}
                            onChange={(e) =>
                              setTempValues(prev => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                          />
                        )
                      ) : (
                        <span
                          onDoubleClick={() => {
                            if (field.editable) {
                              setEditingId(id);
                              setTempValues(item);
                              setIsCheck([id]);
                            }
                          }}
                        >
                          {String(value)}
                        </span>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminTable;
