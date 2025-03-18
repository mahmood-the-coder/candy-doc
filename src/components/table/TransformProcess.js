import { findAncestor } from "../find-ancestor/index.js";
const math=require("mathjs")
const transformedIcon = document.createElement("div");

transformedIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__tableCellTransformedIcon"
);

window.addEventListener("mousedown", (e) => {
  if(!e.target.classList.contains("candyDoc__tableCellTransformedIcon"))return;
  const textBox = e.target.parentElement.querySelector(".candyDoc__tableCellTextBox")
  textBox.innerText = "";
  textBox.dataset.transformation = "";
  textBox.dataset.expression = "";
  textBox.style.outline = "1px dotted var(--color)"
  transformedIcon?.remove()


})
transformedIcon.innerHTML =
  /*html*/

  `<svg
  pointerEvents="none"
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  stroke="var(--color)"
  strokeWidth="0.00024000000000000003"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM10 18C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16V18ZM14 16C13.4477 16 13 16.4477 13 17C13 17.5523 13.4477 18 14 18V16ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13V11ZM3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L3.70711 2.29289ZM20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L20.2929 21.7071ZM19.4115 14.0898C19.1224 14.5604 19.2696 15.1763 19.7402 15.4653C20.2108 15.7544 20.8266 15.6072 21.1157 15.1366L19.4115 14.0898ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11V13ZM7.08376 7.08376L7.79087 6.37666L7.08376 7.08376ZM8 16C5.79086 16 4 14.2091 4 12H2C2 15.3137 4.68629 18 8 18V16ZM16 8C18.2091 8 20 9.79086 20 12H22C22 8.68629 19.3137 6 16 6V8ZM14 8H16V6H14V8ZM10 16H8V18H10V16ZM16 16H14V18H16V16ZM20 12C20 12.7678 19.7846 13.4823 19.4115 14.0898L21.1157 15.1366C21.6767 14.2232 22 13.1478 22 12H20ZM8 13H12V11H8V13ZM2.29289 3.70711L6.37666 7.79087L7.79087 6.37666L3.70711 2.29289L2.29289 3.70711ZM6.90166 6.10048C4.11245 6.61703 2 9.06076 2 12H4C4 10.0423 5.40739 8.41122 7.26586 8.06704L6.90166 6.10048ZM6.37666 7.79087L16.2091 17.6233L17.6233 16.2091L7.79087 6.37666L6.37666 7.79087ZM16.2091 17.6233L20.2929 21.7071L21.7071 20.2929L17.6233 16.2091L16.2091 17.6233ZM16.7341 15.933C16.4969 15.9769 16.2516 16 16 16V18C16.3743 18 16.7415 17.9656 17.0983 17.8995L16.7341 15.933Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>`;
export function initTransformProcess() {

  let isTransforming = false;
  let origin = "";
  let expression = "";
  let table = null;

  let transformed = []
  window.addEventListener("keyup", (e) => {
    
    if (!e.target.classList.contains("candyDoc__tableCellTextBox")) return;
    if (!table) return;
    if (!e.target?.parentElement?.dataset?.calcGroup) return;
    const result = e.target.parentElement.dataset.calcGroup.replace("calcGroup__", "");

    if (!result) return;
    const textBox = table.querySelector(`[data-result='${result}']`)
    
    if (!textBox) return;
    const to = textBox.dataset.name;
    const originCol = origin.substring(0, 1);
    const originRow = origin.substring(1, 2);
    const toCol = to.substring(0, 1);
    const toRow = to.substring(1, 2);
    const colDiff = getLetterNumber(toCol) - getLetterNumber(originCol);
    const rowDiff = parseInt(toRow) - parseInt(originRow);

    calculate(textBox, table, colDiff, rowDiff, result);

  });
  function onMouseEnter(e) {
    if (!isTransforming) return;
    if (!transformed.includes(e.target))
      transformed.push(e.target);
  }
  window.addEventListener("mousedown", (e) => {
    table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;



    if (e.target?.classList?.contains("candyDoc__tableCellTextBox")) {
      expression = e.target?.dataset?.expression ?? "";
      if (expression !== "") {
        isTransforming = true;
        origin = e.target.dataset.name;
      } else {
        isTransforming = false;
      }
    }
    transformed = []
    table.querySelectorAll(".candyDoc__tableCell").forEach(cell => {
      cell.addEventListener("mouseenter", onMouseEnter)
    })
  });

  window.addEventListener("mousemove", (e) => {



  });

  window.addEventListener("mouseup", (e) => {
    if (!table) return;
    if (!isTransforming) return;

   

    transformed.forEach(t => {

      const textBox = t.querySelector(".candyDoc__tableCellTextBox")
      textBox.dataset.result = Math.random().toString(16)
      textBox.dataset.expression = expression;
      textBox.style.outline = "2px solid rgba(50,255,50,0.5)";
      const to = textBox.dataset.name;
      const originCol = origin.substring(0, 1);
      const originRow = origin.substring(1, 2);
      const toCol = to.substring(0, 1);
      const toRow = to.substring(1, 2);
      const colDiff = getLetterNumber(toCol) - getLetterNumber(originCol);
      const rowDiff = parseInt(toRow) - parseInt(originRow);

      calculate(textBox, table, colDiff, rowDiff);
    })
    isTransforming = false;


  });
}

function calculate(textBox, table, colDiff, rowDiff) {
  const valuesRange = []
  const expression = textBox.dataset.expression;
  let toEval = expression
    .replace("=", "")
    .replace(/([+\-*/%()])/g, " $1 ")
    .trim();
  console.log(expression);
  
  toEval.split(" ").forEach((sub) => {
    if (sub.includes(":")) {
      const startCell = table.querySelector(
        `[data-name='${addToLetter(sub[0], colDiff)}${parseInt(sub[1]) + rowDiff
        }']`
      );
      const endCell = table.querySelector(
        `[data-name='${addToLetter(sub[3], colDiff)}${parseInt(sub[4]) + rowDiff
        }']`
      );

      getCellsBetween(startCell, endCell)?.forEach((c) => {
        valuesRange.push(c?.innerText?.trim() ?? "0");
        c.dataset.calcGroup = "calcGroup__" + textBox.dataset.result;
      });

      toEval = toEval.replace(sub, "[" + valuesRange.toString() + "]");
    } else if (/^[A-Z]\d+$/.test(sub)) {
      const contributedCell = table.querySelector(
        `[data-name='${addToLetter(sub[0], colDiff)}${parseInt(sub[1]) + rowDiff
        }']`
      );
      const value = contributedCell?.innerText?.trim() ?? "0";
      toEval = toEval.replace(sub, value);
      contributedCell.dataset.calcGroup = "calcGroup__" + textBox.dataset.result;
    }
  });
  try {
    const result = math.evaluate(toEval);
    

    textBox.innerText = result.toString().replace("[", "").replace("]", "");
    textBox.dataset.expression = expression
      .replace("=", "")
      .replace(/([+\-*/%()])/g, " $1 ")
      .trim()
      .split(" ")
      .map((sub) => {
        const match = sub.match(/^([A-Za-z]+)(\d+)$/); // Match letter(s) and digit(s)
        if (match) {
          const letter = match[1];
          const number = parseInt(match[2]);
          return `${addToLetter(letter, colDiff)}${number + rowDiff}`;
        }
        return sub; // Return operators or other non-matching parts as is
      })
      .join(" ");

    textBox.parentElement.append(transformedIcon);
    transformedIcon.style.opacity = "1";
  } catch (error) {
    textBox.innerText="Err!"
  }
  finally {

  }
}

function getLetterNumber(letter) {
  return letter.toLowerCase().charCodeAt(0);
}

function getCellsBetween(startCell, endCell) {
  function cellToIndices(cell) {
    if (!cell || !cell.dataset.name) return;
    const column = cell.dataset.name.charCodeAt(0) - "A".charCodeAt(0) + 1;
    const row = parseInt(cell.dataset.name.slice(1), 10);
    return { column, row };
  }

  const start = cellToIndices(startCell);
  const end = cellToIndices(endCell);

  const cells = [];
  if (!start || !end) return;
  for (let row = start.row; row <= end.row; row++) {
    for (let column = start.column; column <= end.column; column++) {
      const cellName =
        String.fromCharCode("A".charCodeAt(0) + column - 1) + row;
      const cell = document.querySelector(`[data-name="${cellName}"]`);
      if (cell) {
        cells.push(cell);
      }
    }
  }

  return cells;
}

function addToLetter(letter, num) {
  if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
    throw new Error("Input must be a single uppercase letter (A-Z).");
  }

  const currentPosition = letter.charCodeAt(0) - "A".charCodeAt(0) + 1;
  const newPosition = ((currentPosition + num - 1) % 26) + 1;
  return String.fromCharCode("A".charCodeAt(0) + newPosition - 1);
}
