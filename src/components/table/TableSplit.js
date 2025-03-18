import { findAncestor } from "../find-ancestor/index.js";
import { isInside } from "../intersection/index.js";
import { createTableCell } from "./TableCell.js";

export function initTableSplit() {
  let startCell = null;
  let table = null;
  let isSplit = false;
  // Handle mousedown and mouseup for drag selection
  window.addEventListener("mousedown", (event) => {
    if (!event.ctrlKey) return;
    table = findAncestor(event.target, "candyDoc__tableWrapper");
    if (!table) return;

    startCell=findAncestor(event.target,"merged")
    
    if (!startCell) return;
    isSplit = true;




  });

  window.addEventListener("mouseup", (event) => {
    if (!isSplit) return;
    if (!table) return;
    if (!startCell) return;
    splitSingleCell(startCell);
    isSplit=false;
    startCell.remove();
    startCell=null;


  });

  function parseGridArea(area) {
    const [rowStart, colStart, rowEnd, colEnd] = area
      .split("/")
      .map((val) => parseInt(val.trim()));
    return { rowStart, colStart, rowEnd, colEnd };
  }

  function splitSingleCell(cell) {
    const { rowStart, colStart, rowEnd, colEnd } = parseGridArea(
      getComputedStyle(cell).gridArea
    );
    const rowSpan = rowEnd - rowStart;
    const colSpan = colEnd - colStart;

    const horizontalSplit = colSpan > rowSpan;


    if (horizontalSplit) {
      // Split horizontally into two equal parts
      createAndAppendCell(
        rowStart,
        colStart,
        rowEnd,
        colStart + Math.ceil(colSpan / 2)
      );
      createAndAppendCell(
        rowStart,
        colStart + Math.ceil(colSpan / 2),
        rowEnd,
        colEnd
      );
    } else {
      // Split vertically into two equal parts
      createAndAppendCell(
        rowStart,
        colStart,
        rowStart + Math.ceil(rowSpan / 2),
        colEnd
      );
      createAndAppendCell(
        rowStart + Math.ceil(rowSpan / 2),
        colStart,
        rowEnd,
        colEnd
      );
    }
  }



  function createAndAppendCell(rowStart, colStart, rowEnd, colEnd) {

    const cell = createTableCell(`${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`, "", parseInt(rowStart) - 1, parseInt(colStart) - 1);

    if (!cell.style.gridArea.includes("NaN") && !cell.style.gridArea.includes("undefined")) {

      table.querySelector(".candyDoc__table").append(cell)
      const { rowStart, colStart, rowEnd, colEnd } = parseGridArea(
        getComputedStyle(cell).gridArea
      );
      const rowSpan = rowEnd - rowStart;
      const colSpan = colEnd - colStart;
      if (rowSpan > 1 || colSpan > 1)
        cell.classList.add("merged")
      cell.style.borderTop = startCell.style.borderTop
      cell.style.borderLeft = startCell.style.borderLeft
      cell.style.borderRight = startCell.style.borderRight
      cell.style.borderBottom = startCell.style.borderBottom
      cell.style.backgroundColor = startCell.style.backgroundColor
      cell.style.color = startCell.style.color
      
    }
   


  }
  
  
}

