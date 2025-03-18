import { findAncestor } from "../../find-ancestor/index.js";
import {
  applyTemplateCol,
  applyTemplateRow,
  getTemplateCols,
  getTemplateRows,
} from "../TableTemplate.js";
import { handleBottom } from "./elements/handleBottom.js";
import { handleLeft } from "./elements/handleLeft.js";
import { handleRight } from "./elements/handleRight.js";
import { handleTop } from "./elements/handleTop.js";
let currentHandle = null;
let startX, startY, startWidth, startHeight;
export let currentTarget = null;
let isResizing = false;
let deltaX = 0;
let deltaY = 0;
const MIN_SIZE = 5;
let zoom=1
export function initTableResize() {
  window.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("table-resize")) {
      currentTarget = e.target.parentElement;
    } else if (findAncestor(e.target, "table-resize")) {
      currentTarget = findAncestor(e.target, "table-resize");
    } else {
      currentTarget?.querySelectorAll(".handle").forEach((h) => h?.remove());
    }

    if (!currentTarget) return;
    currentTarget.append(handleLeft, handleRight, handleBottom, handleTop);
    const page=document.body.querySelector(".candyDoc__page");
    zoom=window.devicePixelRatio*(page.getBoundingClientRect().width/page.offsetWidth);
    handleBottom.addEventListener("mousedown", initHandle);
    handleTop.addEventListener("mousedown", initHandle);
    handleLeft.addEventListener("mousedown", initHandle);
    handleRight.addEventListener("mousedown", initHandle);
  });

  window.addEventListener("mouseup", () => {
    if (!isResizing) return;
    isResizing = false;
    applyTemplateCol(currentTarget);
    applyTemplateRow(currentTarget);
    for (let index = 0; index < getTemplateCols(currentTarget).length; index++) {
      const element = getTemplateCols(currentTarget)[index];
      currentTarget.querySelectorAll(".candyDoc__tableColResizeHandle")[index].dataset.startWidth=element.replace("px","")
      
    }
    for (let index = 0; index < getTemplateRows(currentTarget).length; index++) {
      const element = getTemplateRows(currentTarget)[index];
      currentTarget.querySelectorAll(".candyDoc__tableRowResizeHandle")[index].dataset.startHeight=element.replace("px","")
      
    }
    currentTarget.querySelectorAll(".candyDoc__tableColResizeHandle").forEach((h,index) => {
      h.style.left =
        getTemplateCols(currentTarget)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, index+ 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
    currentTarget.querySelectorAll(".candyDoc__tableRowResizeHandle").forEach((h,index) => {
      h.style.top =
        getTemplateRows(currentTarget)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, index+ 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
  });

  window.addEventListener("mousemove", resize);
}

function initHandle(e) {
  isResizing = true;
  currentHandle = e.target;
  deltaX = 0;
  deltaY = 0;
  startX = currentHandle.parentElement.offsetLeft;
  startY = currentHandle.parentElement.offsetTop;
  startWidth = currentHandle.parentElement.offsetWidth;
  startHeight = currentHandle.parentElement.offsetHeight;
}

function resize(e) {
  if (!isResizing) return;
  if (!currentTarget) return;

  const table = currentTarget;
  if (
    currentHandle &&
    currentHandle.classList.contains("candyDoc__resizeHandleRight")
  ) {
    for (let index = 0; index < getTemplateCols(table).length; index++) {
      if (
        getTemplateCols(table)[index].replace("px", "") < MIN_SIZE &&
        e.movementX < 0
      ) {
        return ;
      }
    }
  }
  if (
    currentHandle &&
    currentHandle.classList.contains("candyDoc__resizeHandleLeft")
  ) {
    for (let index = 0; index < getTemplateCols(table).length; index++) {
      if (
        getTemplateCols(table)[index].replace("px", "") < MIN_SIZE &&
        e.movementX > 0
      ) {
        return ;
      }
    }
  }
  if (
    currentHandle &&
    currentHandle.classList.contains("candyDoc__resizeHandleTop")
  ) {
    for (let index = 0; index < getTemplateRows(table).length; index++) {
      if (
        getTemplateRows(table)[index].replace("px", "") < MIN_SIZE &&
        e.movementY > 0
      ) {
        return ;
      }
    }
  }
  if (
    currentHandle &&
    currentHandle.classList.contains("candyDoc__resizeHandleBottom")
  ) {
    for (let index = 0; index < getTemplateRows(table).length; index++) {
      if (
        getTemplateRows(table)[index].replace("px", "") < MIN_SIZE &&
        e.movementY < 0
      ) {
        return ;
      }
    }
  }
  deltaX += e.movementX/zoom;
  deltaY += e.movementY/zoom;
  updateTableHandles(table);
  

  if (currentHandle.classList.contains("candyDoc__resizeHandleRight")) {
    let width = startWidth + deltaX;

    for (let index = 0; index < getTemplateCols(table).length; index++) {
      const tempColWidth = parseFloat(
        getTemplateCols(table)[index].replace("px", "")
      );
      let cellWidth =
        tempColWidth + (e.movementX/zoom) / getTemplateCols(table).length;
      const templateCols = getTemplateCols(table);
      templateCols[index] = cellWidth + "px";
      table.dataset.gridTemplateColumns = templateCols.join(" ");
    }
    applyTemplateCol(table);
    table.style.width = width + "px";
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleBottom")) {
    let height = startHeight + deltaY;

    for (let index = 0; index < getTemplateRows(table).length; index++) {
      const templateRows = getTemplateRows(table);
      templateRows[index] =
        parseFloat(getTemplateRows(table)[index].replace("px", "")) +
        (e.movementY/zoom) / getTemplateRows(table).length +
        "px";
      table.dataset.gridTemplateRows = templateRows.join(" ");
    }
    applyTemplateRow(table);

    table.style.height = height + "px";
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleTop")) {
    let height = startHeight - deltaY;

    for (let index = 0; index < getTemplateRows(table).length; index++) {
      const templateRows = getTemplateRows(table);
      templateRows[index] =
        parseFloat(getTemplateRows(table)[index].replace("px", "")) -
        (e.movementY/zoom) / getTemplateRows(table).length +
        "px";
      table.dataset.gridTemplateRows = templateRows.join(" ");
    }
    applyTemplateRow(table);

    let top = startY + deltaY;

    table.style.height = height + "px";
    table.style.top = top + "px";
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleLeft")) {
    let width = startWidth - deltaX;

    let left = startX + deltaX;

    for (let index = 0; index < getTemplateCols(table).length; index++) {
      const templateCols = getTemplateCols(table);
      templateCols[index] =
        parseFloat(getTemplateCols(table)[index].replace("px", "")) -
        (e.movementX/zoom) / getTemplateCols(table).length +
        "px";
      table.dataset.gridTemplateColumns = templateCols.join(" ");
    }
    applyTemplateCol(table);

    table.style.width = width + "px";
    table.style.left = left + "px";
  }
  table
    .querySelectorAll(".candyDoc__tableRowResizeHandle")
    .forEach((h, index) => {
      h.style.top =
        getTemplateRows(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0) + "px";
    });
  table
    .querySelectorAll(".candyDoc__tableColResizeHandle")
    .forEach((h, index) => {
      h.style.left =
        getTemplateCols(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0) + "px";
    });
}



function updateTableHandles(table) {
  table
    .querySelectorAll(".candyDoc__tableColSwapHandle")
    .forEach((h, index) => {
      h.style.left =
        getTemplateCols(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0) + "px";
    });
  table
    .querySelectorAll(".candyDoc__tableRowSwapHandle")
    .forEach((h, index) => {
      h.style.top =
        getTemplateRows(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0) + "px";
    });
  table.querySelector(".candyDoc__tableAddRowHandle").style.top =
    getTemplateRows(table)
      .map((t) => parseFloat(t.replace("px", "")))
      .reduce((v, a) => {
        return v + a;
      }, 0) +
    25 +
    "px";
  table.querySelector(".candyDoc__tableRemoveRowHandle").style.top =
    getTemplateRows(table)
      .map((t) => parseFloat(t.replace("px", "")))
      .reduce((v, a) => {
        return v + a;
      }, 0) +
    10 +
    "px";

  table.querySelector(".candyDoc__tableAddColHandle").style.left =
    getTemplateCols(table)
      .map((t) => parseFloat(t.replace("px", "")))
      .reduce((v, a) => {
        return v + a;
      }, 0) +
    25 +
    "px";
  table.querySelector(".candyDoc__tableRemoveColHandle").style.left =
    getTemplateCols(table)
      .map((t) => parseFloat(t.replace("px", "")))
      .reduce((v, a) => {
        return v + a;
      }, 0) +
    10 +
    "px";
    table
    .querySelectorAll(".candyDoc__tableRowName")
    .forEach((h, index) => {
      h.style.top =
        getTemplateRows(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0)+parseFloat(getTemplateRows(table)[index].replace("px",""))/2 + "px";
    });
    table
    .querySelectorAll(".candyDoc__tableColName")
    .forEach((h, index) => {
      h.style.left =
        getTemplateCols(table)
          .map((t) => parseFloat(t.replace("px", "")))
          .slice(0, index)
          .reduce((v, a) => {
            return a + v;
          }, 0)+parseFloat(getTemplateCols(table)[index].replace("px",""))/2 + "px";
    });
}
