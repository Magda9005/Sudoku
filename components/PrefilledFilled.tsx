import React from "react";
import "./PrefilledField.scss";

type PrefilledFieldProps = {
  index: number;
  value: number | string;
  onSelect: (index: number) => void;
  isSelected: boolean;
};

const PrefilledField: React.FC<PrefilledFieldProps> = ({
  value,
  isSelected,
  index,
  onSelect,
}) => (
  <input
    readonly
    className="uneditableField"
    value={value}
    onClick={() => {
      onSelect(index);
    }}
    style={{
      backgroundColor: isSelected ? "lightgrey" : undefined,
    }}
  />
);

export default PrefilledField;
