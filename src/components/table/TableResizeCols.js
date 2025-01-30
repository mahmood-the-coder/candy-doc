import { findAncestor } from "../find-ancestor/index.js";
import { applyTemplateCol, getTemplateCols } from "./TableTemplate.js";
export function initResizeCols() {
  let isResizing = false;
  let startWidth = 0;
  let deltaWidth = 0;
  const MIN_WIDTH = 5;
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
    table.querySelectorAll(".candyDoc__tableColResizeHandle").forEach(r=>r.remove())
    for (let index = 0; index < getTemplateCols(table).length; index++) {
      const tempCol = getTemplateCols(table)[index];
      addColResizeHandle(table,index, tempCol);
    }
    table.querySelectorAll(".candyDoc__tableColResizeHandle").forEach((h) => {
      h.style.left =
        getTemplateCols(table)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, parseInt(h.dataset.index) + 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
  });

  window.addEventListener("mousedown", (e) => {
    if(!table)return;
    if (!e.target.classList.contains("candyDoc__tableColResizeHandle")) return;
    isResizing = true;
    deltaWidth = 0;
    startWidth = parseFloat(
      getTemplateCols(table)[e.target.dataset.index].replace("px", "")
    );
    currentHandle = e.target;
    console.log(currentHandle);
    
    e.target.dataset.startX = "0";
  });
  function handleMouseMove(e) {
    if(!table)return;
    if (!isResizing) return;

    deltaWidth += e.movementX/zoom;
    let width = startWidth + deltaWidth;

    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
    }
   
   const templateCols= getTemplateCols(table);
   templateCols[currentHandle.dataset.index] = width+"px";
   table.dataset.gridTemplateColumns=templateCols.join(" ")
    applyTemplateCol(table);

    const tableWidth = getTemplateCols(table).reduce((a, v) => {
      return a + parseFloat(v.replace("px", ""));
    }, 0);

    table.style.width = tableWidth + "px";

    currentHandle.style.left =
      parseFloat(currentHandle.dataset.startX) + deltaWidth + "px";
    table.querySelectorAll(".candyDoc__tableColResizeHandle").forEach((h) => {
      h.style.left =
        getTemplateCols(table)
          .map((c) => parseFloat(c.replace("px", "")))
          .slice(0, parseInt(h.dataset.index) + 1)
          .reduce((a, v) => {
            return a + v;
          }, 0) + "px";
    });
    table.querySelector(".candyDoc__tableAddColHandle").style.left =
    getTemplateCols(table).map(t=>parseFloat(t.replace("px",""))).reduce((v,a)=>{
     return v+a;
    },0) + 25 + "px";
    table.querySelector(".candyDoc__tableRemoveColHandle").style.left =
    getTemplateCols(table).map(t=>parseFloat(t.replace("px",""))).reduce((v,a)=>{
     return v+a;
    },0) + 10 + "px";
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

  function handleMouseUp() {
    if (!isResizing) return;
    currentHandle = null;
    isResizing = false;
  }
}

function createColResizeHandle() {
  const resizeHandle = document.createElement("div");
  resizeHandle.classList.add(
    "candyDoc__tableColResizeHandle",
    "candyDoc__tableResizeHandle"
    ,"candyDoc__tableHandle"
  );

  resizeHandle.draggable = false;

  return resizeHandle;
}
function addColResizeHandle(table,index, tempCol) {
  let handle = createColResizeHandle();
  handle.dataset.resizeCol = (index + 1).toString();
  handle.dataset.index = index.toString();
  table.append(handle);
  handle.style.left =
    parseFloat(tempCol.replace("px", "") * (index + 1)) + "px";
  handle.dataset.startX = handle.offsetLeft.toString();
}