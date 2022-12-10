import React from "react";
import "./BoardField.scss";
import EditableField from "./EditableField";
import PrefilledField from "./PrefilledFilled";

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
    style={{ backgroundColor: isHighlighted ? "lightblue" : undefined }}
  >
    {isCellEditable ? (
      <EditableField
        index={index}
        onChange={onChange}
        onSelect={onSelect}
        isSelected={isSelected}
        value={value}
      />
    ) : (
      <PrefilledField
        value={value}
        isSelected={isSelected}
        index={index}
        onSelect={onSelect}
      />
    )}
  </td>
);

export default BoardField;
