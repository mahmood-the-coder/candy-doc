import { findAncestor } from "../find-ancestor/index.js";
import { isCollide } from "./TableCollision.js";
import { tableSwap } from "./TableSwap.js";
import { getTemplateRows } from "./TableTemplate.js";
export function initSwapRows() {
  let toSwap = [];
  let clones = [];
  let isDragging = false;
  let deltaY = 0;
  let startY = 0;
  let table = null;
  let zoom=1
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  window.addEventListener("mousedown", (e) => {
    table = findAncestor(e.target, "candyDoc__tableWrapper");
    if (!table) return;
    const page=document.body.querySelector(".candyDoc__pagesWrapper")
  zoom=window.devicePixelRatio *(page.getBoundingClientRect().width/page.offsetWidth);
    for (let index = 0; index < getTemplateRows(table).length; index++) {
      let handle = null;
      const exist = table.querySelector(`[data-swap-row='${index + 1}']`);
      if (exist) handle = exist;
      else handle = createRowSwapHandle();

      handle.dataset.swapRow = (index + 1).toString();

      table.append(handle);
    }
    updateHandlePosition(table);
    isDragging = true;
    toSwap = [
      ...table.querySelectorAll(`[data-row='${e.target.dataset.swapRow}']`),
    ]
      .filter((t) => t.classList.contains("candyDoc__tableCell"))
      .filter(t=>{
        const gridArea=getComputedStyle(t).gridArea
        return !(gridArea.includes("NaN") || gridArea.includes("undefined") )
      })
      .filter((t) => {
        const gridArea=getComputedStyle(t).gridArea
    
        const startRow = parseInt(gridArea.split("/")[0].trim());
        const startCol = parseInt(gridArea.split("/")[1].trim());
        const endRow = parseInt(gridArea.split("/")[2].trim());
        const endCol = parseInt(gridArea.split("/")[3].trim());
        const rowSpan = endRow - startRow;
        const colSpan = endCol - startCol;
        return rowSpan <= 1 && colSpan <= 1;
      });
    deltaY = 0;
    if (toSwap.length >= 1) startY = toSwap[0].offsetTop;

    table.querySelectorAll(".candyDoc__tableRowSwapHandle").forEach((h) => {
      h.style.opacity = "0";
    });
    table.querySelectorAll(".candyDoc__tableRowResizeHandle").forEach((h) => {
      h.classList.add("dragging");
    });

    toSwap.forEach((t) => {
      t.classList.add("dragging");
      clones.push(t.cloneNode(true));
    });

    clones.forEach((c, index) => {
      table.append(c);
      c.style.top = toSwap[0].offsetTop + "px";
      c.style.left = toSwap[index].offsetLeft + "px";
      c.style.scale = "0.85";
      c.style.opacity = "0.5";
      c.classList.add("dragging");
      c.style.gridArea = "unset";
      c.style.position = "absolute";
      c.style.width = toSwap[index].offsetWidth + "px";
      c.style.height = toSwap[index].offsetHeight + "px";
    });

    toSwap.forEach((t) => {
      t.style.opacity = "0";
    });
  });

  function updateHandlePosition(table) {
    table
      .querySelectorAll(".candyDoc__tableRowSwapHandle")
      .forEach((h, index) => {
        h.style.top =
          getTemplateRows(table)
            .map((c) => parseFloat(c.replace("px", "")))
            .slice(0, index)
            .reduce((a, v) => {
              return a + v;
            }, 0) + "px";
      });
  }

  function handleMouseMove(e) {
    if (!table) return;
    if (!isDragging) return;
    deltaY += e.movementY/zoom;
    clones.forEach((c) => {
      c.style.top = startY + deltaY + "px";
    });

    const others = [...table.querySelector(".candyDoc__table").children]
      .filter((c) => c.classList.contains("candyDoc__tableCell"))
      .filter((c) => !c.classList.contains("dragging"));

    for (let index = 0; index < toSwap.length; index++) {
      const target = toSwap[index];
      const rect = clones[index].getBoundingClientRect();
      for (let index = 0; index < others.length; index++) {
        const other = others[index];
        const otherRect = other.getBoundingClientRect();
        if (isCollide(rect, otherRect)) {
          tableSwap(table, target, other);
        }
      }
    }
    updateHandlePosition(table);
  }

  function handleMouseUp() {
    if (!table) return;
    if (!isDragging) return;
    isDragging = false;
    table.querySelectorAll(".candyDoc__tableRowSwapHandle").forEach((h) => {
      h.style.opacity = "1";
    });
    clones.forEach((c) => {
      c?.remove();
    });

    toSwap.forEach((t) => {
      t.style.opacity = "1";
      t.classList.remove("dragging");
    });

    toSwap = [];
    clones = [];
    table = null;
  
  }
}

function createRowSwapHandle() {
  const handle = document.createElement("div");
  handle.classList.add("candyDoc__tableRowSwapHandle", "candyDoc__tableHandle","candyDoc__icon");
  handle.draggable = false;
  handle.contentEditable = "false";
  handle.innerHTML =
    /*html*/
    `
  <svg width="100%" height="100%" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="var(--color)">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g fill="var(--color)" fillRule="evenodd">
      <path d="m7 5h2v2h-2z"></path>
      <path d="m12 5h2v2h-2z"></path>
      <path d="m7 9h2v2h-2z"></path>
      <path d="m12 9h2v2h-2z"></path>
      <path d="m7 13h2v2h-2z"></path>
      <path d="m12 13h2v2h-2z"></path>
    </g>
  </g>
</svg>
  `;
  return handle;
}
