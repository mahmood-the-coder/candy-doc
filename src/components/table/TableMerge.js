import { findAncestor } from "../find-ancestor/index.js";
import { createTableCell } from "./TableCell.js";
let currentMerged = null;
export function getCurrentMerged() {
  return currentMerged;
}

export function initTableMerge() {
  let cells = [];
  let canMerge = false;
  let table = null;

  window.addEventListener("mousemove", (e) => {
    if (!table) return;
    if (!e.shiftKey) return;

    table.querySelectorAll(".candyDoc__tableCell").forEach((c) => {


      const startRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
      );
      const startCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
      );
      const endRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[2]?.trim()
      );
      const endCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[3]?.trim()
      );

      if (Math.abs(startRow - endRow) > 1 || Math.abs(startCol - endCol) > 1) {
        c.addEventListener("mouseenter", handleMouseEnter);
      } else {
        c.removeEventListener("mouseenter", handleMouseEnter);
      }

      function handleMouseEnter(e) {
        canMerge = false;
        cells[0] = cells[1] = null;
        currentMerged = e.target;
      }
    });
  });
  window.addEventListener("mousedown", (e) => {
    table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;
    if (!e.shiftKey) return;
    canMerge = true;
    if (findAncestor(e.target,"candyDoc__tableCell")) {
      cells[0] = findAncestor(e.target,"candyDoc__tableCell");
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (!table) return;
    if (!cells[0]) return;
    if (e.target.classList.contains("candyDoc__tableCell")) {
      cells[1] = e.target;
    } else if (
      findAncestor(e.target,"candyDoc__tableCell")
    ) {
      cells[1] = findAncestor(e.target,"candyDoc__tableCell");
    }

    if (!cells[0] || !cells[1]) return;
    cells.sort((a, b) => {
      const aRow = parseInt(
        a?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
      );
      const aCol = parseInt(
        a?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
      );
      const bRow = parseInt(
        b?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
      );
      const bCol = parseInt(
        b?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
      );

      return aRow + aCol - (bRow + bCol);
    });
    const cellOneStartRow = parseInt(
      cells[0]?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
    );
    const cellOneStartCol = parseInt(
      cells[0]?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
    );
    const cellTwoStartRow = parseInt(
      cells[1]?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
    );
    const cellTwoStartCol = parseInt(
      cells[1]?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
    );

    if (
      cellOneStartRow != cellTwoStartRow &&
      cellOneStartCol != cellTwoStartCol
    ) {
      return;
    }
    
    if (cells[0].id == cells[1].id) return;
    if (!canMerge) return;
    const { rowStart:startCellRowStart, rowStart:startCellColStart, rowEnd:startCellRowEnd, colEnd:startCellColEnd }=parseGridArea(getComputedStyle(cells[0]).gridArea)
    const { rowStart:endCellRowStart, colStart:endCellColStart, rowEnd:endCellRowEnd, colEnd:endCellColEnd }=parseGridArea(getComputedStyle(cells[1]).gridArea)
    const rowSpan=endCellRowEnd - startCellRowStart;
    const colSpan=endCellColEnd - startCellColStart;
    console.log(colSpan,rowSpan);
    
    if (colSpan>=rowSpan) {
      mergeCellsVertical(cells);
    } else if (rowSpan>colSpan) {
      mergeCellsHorizontal(cells);
    }

    cells[0] = null;
    cells[1] = null;
  
  });
  function mergeCellsHorizontal(cells) {
    const mergedStartRow = cells[0].style
      .getPropertyValue("grid-area")
      .split("/")[0]
      ?.trim();
    const mergedStartCol = cells[0].style
      .getPropertyValue("grid-area")
      .split("/")[1]
      ?.trim();
    const mergedEndRow = cells[1].style
      .getPropertyValue("grid-area")
      .split("/")[2]
      ?.trim();
    const mergedEndCol = cells[1].style
      .getPropertyValue("grid-area")
      .split("/")[3]
      ?.trim();
    const newMergedCell = createTableCell(
      `${mergedStartRow} / ${mergedStartCol} / ${mergedEndRow} / ${mergedEndCol}`,
      "",
      parseInt(cells[0].dataset.row) - 1,
      parseInt(cells[0].dataset.col) - 1
    );

    table.querySelector(".candyDoc__table").append(newMergedCell);
    newMergedCell.classList.add("merged");
    newMergedCell.style.borderTop = cells[0].style.borderTop;
    newMergedCell.style.borderLeft = cells[0].style.borderLeft;
    newMergedCell.style.borderRight = cells[0].style.borderRight;
    newMergedCell.style.borderBottom = cells[0].style.borderBottom;
    newMergedCell.style.backgroundColor = cells[0].style.backgroundColor;
    newMergedCell.style.color = cells[0].style.color;
    [...document.body.querySelectorAll(".candyDoc__tableCell")].forEach((c) => {
      const startRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
      );
      const startCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
      );
      const endRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[2]?.trim()
      );
      const endCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[3]?.trim()
      );

      if (
        startRow >= mergedStartRow &&
        endRow <= mergedEndRow &&
        startCol >= mergedStartCol &&
        endCol <= mergedEndCol
      ) {
        if (
          c.style.getPropertyValue("grid-area") !=
          newMergedCell.style.getPropertyValue("grid-area")
        )
          c.remove();

      }
    });
  }
  function mergeCellsVertical(cells) {
    const mergedStartRow = parseInt(
      cells[0]?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
    );
    const mergedStartCol = parseInt(
      cells[0]?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
    );
    const mergedEndRow = parseInt(
      cells[1]?.style?.getPropertyValue("grid-area")?.split("/")[2]?.trim()
    );
    const mergedEndCol = parseInt(
      cells[1]?.style?.getPropertyValue("grid-area")?.split("/")[3]?.trim()
    );
    const newMergedCell = createTableCell(
      `${mergedStartRow} / ${mergedStartCol} / ${mergedEndRow} / ${mergedEndCol}`,
      "",
      parseInt(cells[0].dataset.row) - 1,
      parseInt(cells[0].dataset.col) - 1
    );

    table.querySelector(".candyDoc__table").append(newMergedCell);
    newMergedCell.classList.add("merged");
    newMergedCell.style.borderTop = cells[0].style.borderTop;
    newMergedCell.style.borderLeft = cells[0].style.borderLeft;
    newMergedCell.style.borderRight = cells[0].style.borderRight;
    newMergedCell.style.borderBottom = cells[0].style.borderBottom;
    newMergedCell.style.backgroundColor = cells[0].style.backgroundColor;
    newMergedCell.style.color = cells[0].style.color;

    [...document.body.querySelectorAll(".candyDoc__tableCell")].forEach((c) => {
      const startRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[0]?.trim()
      );
      const startCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[1]?.trim()
      );
      const endRow = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[2]?.trim()
      );
      const endCol = parseInt(
        c?.style?.getPropertyValue("grid-area")?.split("/")[3]?.trim()
      );

      if (
        startRow >= mergedStartRow &&
        endRow <= mergedEndRow &&
        startCol >= mergedStartCol &&
        endCol <= mergedEndCol
      ) {
        if (
          c.style.getPropertyValue("grid-area") !=
          newMergedCell.style.getPropertyValue("grid-area")
        )
          c.remove();

      }
    });
    table = null;
  }
}
function parseGridArea(area) {
  const [rowStart, colStart, rowEnd, colEnd] = area
    .split("/")
    .map((val) => parseInt(val.trim()));
  return { rowStart, colStart, rowEnd, colEnd };
}