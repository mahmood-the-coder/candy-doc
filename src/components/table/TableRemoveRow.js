import { findAncestor } from "../find-ancestor/index.js";
import { getTableDimensions, initTable } from "./Table.js";
import { applyTemplateRow, getTemplateRows, removeTemplateRow } from "./TableTemplate.js";

const handle = createRowRemoveHandle();

export function initRemoveTableRow() {
    let table = null;

    function addHandles(table) {
        const rows = getTemplateRows(table);

        handle.dataset.removeRow = rows.length.toString();
        table.append(handle);
        handle.style.top = table.offsetHeight + 5 + "px";
    }

    window.addEventListener("mousedown", (e) => {
        table = findAncestor(e.target, "candyDoc__tableWrapper");
        if (!table) return;
        addHandles(table);
    });
}

window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__tableRemoveRowHandle")) return;
    e.stopPropagation();

   
    const table = e.target.parentElement;

    const rows = getTemplateRows(table);
    if (rows.length === 1) {return}; // Prevent removing rows if none exist

    const lastRowIndex = rows.length ;




    const cellElements = Array.from(
        table.querySelectorAll(`.candyDoc__tableCell[data-row="${lastRowIndex}"]`)
    );
    cellElements.forEach((cell) => cell.remove());

   
    // Remove the template row
    removeTemplateRow(table);
    // Recalculate and apply table dimensions and template
    const { tableHeight, tableWidth } = getTableDimensions(table);
    table.style.height = tableHeight + "px";
    table.style.width = tableWidth + "px";
    applyTemplateRow(table)
    initTable(table);
    table.querySelector([`[data-swap-row='${lastRowIndex}']`])?.remove()
    table.querySelector([`[data-name-row='${lastRowIndex}']`])?.remove()

});

function createRowRemoveHandle() {
    const removeHandle = document.createElement("div");
    removeHandle.classList.add(
        "candyDoc__tableRemoveRowHandle",
        "candyDoc__tableHandle",
        "candyDoc__icon"
        
    );
    removeHandle.draggable = false;
    removeHandle.innerHTML =
        /*html*/ `
        <svg p height="19px" width="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="var(--color)"
            stroke-width="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      
    `;
    return removeHandle;
}
