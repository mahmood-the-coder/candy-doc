import { findAncestor } from "../find-ancestor/index.js";
import { getTableDimensions, initTable } from "./Table.js";
import { createTableCell } from "./TableCell.js";
import {
  applyTemplateRow,
  getTemplateCols,
  getTemplateRows,
  insertTemplateRow,
} from "./TableTemplate.js";

const handle = createRowAddHandle();
export function initAddTableRow() {
  let table = null;
  function addHandles(table) {
   
   

    handle.dataset.addRow = getTemplateRows(table).length.toString();
    table.append(handle);
    handle.style.top=table.offsetHeight+20+"px"
  }

  window.addEventListener("mousedown", (e) => {
    table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;
    addHandles(table);
  });
}
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__tableAddRowHandle")) return;
  e.stopPropagation();
  const handle = e.target;
  const table = e.target.parentElement;
  const row = parseInt(handle.dataset.addRow)

  for (let index = 0; index < getTemplateCols(table).length; index++) {
    const newCellElement = createTableCell(
      `${row + 1}/ ${index + 1}/ ${row + 2}/ ${index + 2}`,
      "",
      row,
      index
    );
    table.querySelector(".candyDoc__table").append(newCellElement)
  }

  const aboveRow = getTemplateRows(table)[handle.dataset.addRow - 1];
  insertTemplateRow(table, parseInt(handle.dataset.addRow), aboveRow);
  const { tableHeight, tableWidth } = getTableDimensions(table);
  table.style.height = tableHeight + "px";
  table.style.width = tableWidth + "px";
  applyTemplateRow(table);
  initTable(table);
});
function createRowAddHandle() {
  const addHandle = document.createElement("div");
  
  addHandle.classList.add(
    "candyDoc__tableAddRowHandle",
    "candyDoc__tableHandle",
    "candyDoc__icon"
  );

  addHandle.draggable = false;
  addHandle.innerHTML =
    /*html*/
    `
        <svg style="pointer-events:none;" width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--color)" strokeWidth="0.00014000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="var(--color)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="var(--color)"></path> </g></svg>    `;

  return addHandle;
}

