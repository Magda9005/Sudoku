import { useState } from "react";
import BoardField from "./BoardField";
import { isCellHighlighted } from "../logic/functions";
import React from "react";
import "./Rows.scss";

type RowsProps = {
  board: (number | string)[];
  onChange: (index: number, value: string) => void;
  isCellEditable: (index: number) => boolean;
};

const Rows: React.FC<RowsProps> = ({ board, onChange, isCellEditable }) => {
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const rows: JSX.Element[] = [];
  for (let i: number = 0; i < board.length; i += 9) {
    const cells: JSX.Element[] = [];
    for (let j: number = i; j < i + 9; j++) {
      cells.push(
        <BoardField
          key={j}
          index={j}
          isHighlighted={isCellHighlighted(j, selectedIndex)}
          isCellEditable={isCellEditable(j)}
          onSelect={setSelectedIndex}
          onChange={onChange}
          isSelected={board[j] === board[selectedIndex]}
          value={board[j]}
        />
      );
    }
    rows.push(
      <tr className="row" key={i}>
        {cells}
      </tr>
    );
  }
  return <>{rows}</>;
};

export default Rows;
