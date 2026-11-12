// Section 06 — the grid: a Matrix made of Cells.
//
// Props:  matrix        an array of rows, each an array of numbers (any size — don't assume 3)
//         onIncrement   a function: onIncrement(row, col)   (you need it in section 08)
//
// Render:
//   <table className="matrix">
//     <tbody>
//       one <tr> per row
//         one <td> per value, with a <Cell> inside it
//
// Lists need a key on the element you return from map — section 06 says which.
// Section 08: each Cell's onClick calls onIncrement with THAT cell's row and column.
import Cell from "./Cell.jsx";
import { stats } from "./matrix.js";

export default function Matrix({ matrix, onIncrement, onDecrement }) {
  const max = stats(matrix).max;

  return (
    <table className="matrix">
      <tbody>
        {matrix.map((values, r) => (
          <tr key={r}>
            {values.map((value, c) => (
              <td key={c}>
                <Cell
                  row={r}
                  col={c}
                  value={value}
                  onClick={() => onIncrement(r, c)}
                  onDecrement={() => onDecrement(r, c)}
                  isMax={max > 0 && value === max}
                />
              </td>
            ))}
             <td
                className="total"
                aria-label={`Row ${r + 1} total`}
              >
              {values.reduce((sum, value) => sum + value, 0)}
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
