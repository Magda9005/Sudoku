import React from "react";
import "./EditableField.scss";

type EditableFieldProps = {
  index: number;
  value: number | string;
  onSelect: (index: number) => void;
  onChange: (index: number, value: string) => void;
  isSelected: boolean;
};
const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  isSelected,
  index,
  onSelect,
}) => (
  <input
    className="editableField"
    type="number"
    pattern="[0-9]{1}"
    value={value}
    onChange={(e) => {
      onChange(index, e.target.value);
    }}
    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = Math.max(1, parseInt(e.target.value, 10))
        .toString()
        .slice(0, 1);
    }}
    style={{
      backgroundColor: isSelected ? "lightgrey" : undefined,
    }}
    onClick={() => {
      onSelect(index);
    }}
  />
);

export default EditableField;
