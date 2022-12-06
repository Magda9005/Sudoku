import React from "react";
import "./BoardField.scss";

type BoardFieldProps = {
  index: number;
  isHighlighted: boolean;
  isCellEditable: boolean;
  value: number | string;
  onSelect: (index: number) => void;
  onChange: (index: number, value: string) => void;
  isSelected: boolean;
};

const BoardField: React.FC<BoardFieldProps> = ({
  index,
  isHighlighted,
  isCellEditable,
  value,
  onSelect,
  onChange,
  isSelected,
}) => (
  <td
    className="field"
    key={index}
    style={{ backgroundColor: isHighlighted ? "lightblue" : undefined }}
  >
    {isCellEditable ? (
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
    ) : (
      <div
        className="uneditableField"
        onClick={() => {
          onSelect(index);
        }}
        style={{
          backgroundColor: isSelected ? "lightgrey" : undefined,
        }}
      >
        {value}
      </div>
    )}
  </td>
);

export default BoardField;
