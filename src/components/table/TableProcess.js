import { getRange } from "../../components/range/index.js";
import { findAncestor } from "../find-ancestor/index.js";
const math=require("mathjs")
let toCalcValues = [];
let expression = "";
let result = "";
let isProcess = false;
let isDragging = false;
let calcGroup=""
export function initTableProcess() {
  let table = null;
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("mousedown", handleMousedown);
  window.addEventListener("mousemove", handleMouseMove); 
  window.addEventListener("mouseup", handleMouseUp);
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
  function handleKeyup(e) {
    if (!table) return;
    const cell = e.target.closest(".candyDoc__tableCell");
    if (!cell || !table.contains(cell)) return;

    const textBox = cell.querySelector(".candyDoc__tableCellTextBox");
    

    if (textBox && textBox.innerText[0] === "=") {
      isProcess = true;
      textBox.classList.add("candyDoc__progressCell");
    } else {
      isProcess = false;
      textBox?.classList.remove("candyDoc__progressCell");
    }
    if(e.key=="=")
    result= textBox.dataset.result=Math.random().toString(16)
  }

  function handleKeydown(e) {
    if (!table) return;
    const textBox = table.querySelector(".candyDoc__progressCell");
    if (!textBox) return;

    if (e.code === "Enter" && isProcess) {
      isProcess = false;
      expression = textBox.textContent;
      textBox.dataset.expression = expression;
      calculate(textBox, table);
    }
  }

  function handleMousedown(e) {
    table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;
    const cell = e.target.closest(".candyDoc__tableCell");
    if (!cell || !table.contains(cell)) return;

    const textBox = table.querySelector(".candyDoc__progressCell");
    if (
      !isProcess ||
      !textBox ||
      !e.target.dataset.name ||
      !e.target.dataset.value
    )
      return;
    e.preventDefault();
    toCalcValues = [];
    isDragging = true;
    document.body.style.cursor = "crosshair";
    if(e.target.innerText.includes("="))return;
    toCalcValues.push({
      value: e.target.dataset.value.trim(),
      name: e.target.dataset.name.trim(),
    });
  }

  function handleMouseMove(e) {
    if (!table) return;
    const target = e.target.closest(".candyDoc__tableCell");
    if (!target || !table.contains(target) || !isDragging || !isProcess) return;

    const targetBox = target.querySelector(".candyDoc__tableCellTextBox");
    if (targetBox && !targetBox.classList.contains("candyDoc__progressCell")) {
      targetBox.dataset.contribution = result;
      toCalcValues.push({
        value: targetBox.dataset.value,
        name: targetBox.dataset.name,
      });
    }
  }

  function handleMouseUp(e) {
    if (!table) return;
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = "auto";

    if (toCalcValues.length >= 2) {
      insertRange();
    } else if (toCalcValues.length == 1) {
      insertSingleValue(e.target);
    }
  }

  function insertRange() {
    const range = getRange();
    const firstSpan = createSpan(toCalcValues[0]);
    range?.insertNode(firstSpan);
    range?.setStartAfter(firstSpan);
    range?.setEndAfter(firstSpan);

    const colon = document.createTextNode(":");
    range?.insertNode(colon);
    range?.setStartAfter(colon);
    range?.setEndAfter(colon);

    const lastSpan = createSpan(toCalcValues[toCalcValues.length - 1]);
    range?.insertNode(lastSpan);
    range?.setStartAfter(lastSpan);
    range?.setEndAfter(lastSpan);
  }

  function insertSingleValue(target) {
    const span = createSpan({
      name: target.dataset.name.trim(),
      value: target.dataset.value.trim(),
    });
    const range = getRange();
    range?.insertNode(span);
    range?.setStartAfter(span);
    range?.setEndAfter(span);

  }

  function createSpan({ name, value }) {
    const span = document.createElement("span");
    span.innerText = name.trim();
    span.dataset.value = value.trim();
    span.style.pointerEvents = "none";
    return span;
  }
}

export function calculate(textBox, table) {
  textBox.dataset.result=result;
  const expression = textBox.dataset.expression;
  let toEval = expression
    .replace("=", "")
    .replace(/([+\-*/%(){}[\]])/g, " $1 ")
    .trim();
  toEval.split(" ").forEach((sub) => {
    if (sub.includes(":")) {
      const [startCell, endCell] = [sub[0] + sub[1], sub[3] + sub[4]].map(
        (name) => table.querySelector(`[data-name='${name}']`)
      );
      const cellsBetween = getCellsBetween(startCell, endCell);
      cellsBetween.forEach(cell=>cell.dataset.calcGroup="calcGroup__"+result)
      const values = cellsBetween.map((c) => c?.innerText?.trim() || "0");
      toEval = toEval.replace(sub, `[${values}]`);
    } else if (/^[A-Z]\d+$/.test(sub)) {
      const contributedCell = table.querySelector(`[data-name='${sub}']`);
      const value = contributedCell?.innerText.trim() || "0";
      contributedCell.dataset.calcGroup="calcGroup__"+result
      toEval = toEval.replace(sub, value);
    }
  });

  try {
    const result = math.evaluate(toEval);
 
    textBox.innerText = result.toString().trim().replace("[", "").replace("]", "");
  } catch (error) {
    textBox.innerText="Err!"
  }
  finally
  {
    isProcess=false;
  }
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
  if (!start || !end) return [];

  const cells = [];
  for (let row = start.row; row <= end.row; row++) {
    for (let column = start.column; column <= end.column; column++) {
      const cellName =
        String.fromCharCode("A".charCodeAt(0) + column - 1) + row;
      const cell = document.querySelector(`[data-name="${cellName}"]`);
      if (cell) cells.push(cell);
    }
  }
  return cells;
}
function getLetterNumber(letter) {
  return letter.toLowerCase().charCodeAt(0);
}