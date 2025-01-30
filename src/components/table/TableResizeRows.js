import { findAncestor } from "../find-ancestor/index.js";
import { applyTemplateRow, getTemplateRows } from "./TableTemplate.js";
export function initResizeRows() {
  let isResizing = false;
  let startHeight = 0;
  let deltaHeight = 0;
  const MIN_HEIGHT = 5;
  let currentHandle = null;
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
      const tempRow = getTemplateRows(table)[index];
      addHandles(index, tempRow);
    }

    table.querySelectorAll(".candyDoc__tableRowResizeHandle").forEach((h) => {
      h.style.top =
        getTemplateRows(table)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, parseInt(h.dataset.index) + 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
  });
  function addHandles(index, tempRow) {
    let handle = null;
    const exist = table.querySelector(`[data-resize-row='${index + 1}']`);
    if (exist) handle = exist;
    else handle = createRowResizeHandle();

    handle.dataset.resizeRow = (index + 1).toString();
    handle.dataset.index = index.toString();

    table.append(handle);
    handle.style.top =
      parseFloat(tempRow.replace("px", "") * (index + 1)) + "px";
    handle.dataset.startX = handle.offsetTop.toString();
  }
  window.addEventListener("mousedown", (e) => {
    if (!table) return;
    if (!e.target.classList.contains("candyDoc__tableRowResizeHandle")) return;
    isResizing = true;
    deltaHeight = 0;
    startHeight = parseFloat(
      getTemplateRows(table)[e.target.dataset.index].replace("px", "")
    );
    currentHandle = e.target;
    e.target.dataset.startX = e.target.offsetTop.toString();
  });
  function handleMouseMove(e) {
    if (!table) return;
    if (!isResizing) return;

    deltaHeight += e.movementY/zoom;
    let height = startHeight + deltaHeight;
    if (height < MIN_HEIGHT) {
      height = MIN_HEIGHT;
    }

    const templateRows = getTemplateRows(table);
    templateRows[currentHandle.dataset.index] = height + "px";
    table.dataset.gridTemplateRows=templateRows.join(" ")
    applyTemplateRow(table);

    const tableHeight = getTemplateRows(table).reduce((a, v) => {
      return a + parseFloat(v.replace("px", ""));
    }, 0);

    table.style.height = tableHeight + "px";

    currentHandle.style.top =
      parseFloat(currentHandle.dataset.startX) + deltaHeight + "px";
    table.querySelectorAll(".candyDoc__tableRowResizeHandle").forEach((h) => {
      h.style.top =
        getTemplateRows(table)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, parseInt(h.dataset.index) + 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
    table.querySelector(".candyDoc__tableAddRowHandle").style.top =
    getTemplateRows(table).map(t=>parseFloat(t.replace("px",""))).reduce((v,a)=>{
     return v+a;
    },0) + 25+ "px";
    table.querySelector(".candyDoc__tableRemoveRowHandle").style.top =
    getTemplateRows(table).map(t=>parseFloat(t.replace("px",""))).reduce((v,a)=>{
     return v+a;
    },0) + 10 + "px";
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
    
  }

  function handleMouseUp() {
    if (!table) return;
    if (!isResizing) return;
    currentHandle = null;
    isResizing = false;
    table = null;
  }
}

function createRowResizeHandle() {
  const resizeHandle = document.createElement("div");

  resizeHandle.classList.add(
    "candyDoc__tableRowResizeHandle",
    "candyDoc__tableResizeHandle",
    "candyDoc__tableHandle"
  );

  resizeHandle.draggable = false;

  return resizeHandle;
}
