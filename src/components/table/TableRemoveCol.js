import { findAncestor } from "../find-ancestor/index.js";
import { getTableDimensions, initTable } from "./Table.js";
import { applyTemplateRow, getTemplateCols, removeTemplateCol } from "./TableTemplate.js";

const handle = createColumnRemoveHandle();

export function initRemoveTableCol() {
    let table = null;

    function addHandles(table) {
        const cols = getTemplateCols(table);

        handle.dataset.removeCol = cols.length.toString();
        table.append(handle);
        handle.style.left = table.offsetWidth + 5 + "px";
    }

    window.addEventListener("mousedown", (e) => {
        table = findAncestor(e.target, "candyDoc__tableWrapper");
        if (!table) return;
        addHandles(table);
    });
}

window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__tableRemoveColHandle")) return;
    e.stopPropagation();

    const table = e.target.parentElement;

    const cols = getTemplateCols(table);
    if (cols.length === 1) return; // Prevent removing columns if none exist

    const lastColIndex = cols.length ;


   

    // Remove corresponding cell elements from the DOM
    const cellElements = Array.from(
        table.querySelectorAll(`.candyDoc__tableCell[data-col="${lastColIndex}"]`)
    );
    cellElements.forEach((cell) => cell.remove());

    // Update table data
   

    // Remove the template column
    removeTemplateCol(table);
    // Recalculate and apply table dimensions and template
    const { tableHeight, tableWidth } = getTableDimensions(table);
    table.style.height = tableHeight + "px";
    table.style.width = tableWidth + "px";
    applyTemplateRow(table);
    initTable(table);
    table.querySelector([`[data-swap-col='${lastColIndex}']`])?.remove()
    table.querySelector([`[data-name-col='${lastColIndex}']`])?.remove()
});

function createColumnRemoveHandle() {
    const removeHandle = document.createElement("div");
    removeHandle.classList.add(
        "candyDoc__tableRemoveColHandle",
        "candyDoc__tableHandle",
        "candyDoc__icon"
    );
    removeHandle.draggable = false;
    removeHandle.innerHTML =
        /*html*/ `
        <svg height="19px" width="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
