import { findAncestor } from "../find-ancestor/index.js";
import { isInside } from "../intersection/index.js";
import { tableSwap } from "./TableSwap.js";
const dragHandle = document.createElement("div");
dragHandle.classList.add("candyDoc__tableCellDragHandle","candyDoc__tableHandle","candyDoc__icon");

dragHandle.innerHTML =   /*html*/
`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
<g
  id="SVGRepo_tracerCarrier"
  strokeLinecap="round"
  strokeLinejoin="round"
></g>
<g id="SVGRepo_iconCarrier">
  <g id="Interface / Drag_Horizontal">
    <g id="Vector">
      <path
        d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z"
        stroke="var(--color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </g>
</g>
</svg>
`;


export function initCellTableDrag() {
 
  let isDragging = false;
  let target = null;
  let clone = null;
  let deltaX = 0;
  let deltaY = 0;
  let startX = 0;
  let startY = 0;
  let zoom=1;
  window.addEventListener("mousedown",(e)=>{
    if(e.target.classList.contains("candyDoc__tableCell"))
    {
      
      e.target.append(dragHandle);
    }
    else if(findAncestor(e.target,"candyDoc__tableCell"))
    {
      findAncestor(e.target,"candyDoc__tableCell").append(dragHandle);
    }
    else
    {
      dragHandle?.remove()
    }
    const page=document.body.querySelector(".candyDoc__pagesWrapper")
  zoom=window.devicePixelRatio * (page.getBoundingClientRect().width/page.offsetWidth);
  })
  window.addEventListener("mousedown", (e) => {
    if(!e.target.classList.contains("candyDoc__tableCellDragHandle"))return;
    isDragging = true;
    target = e.target.parentElement;
    startX = target.offsetLeft;
    startY = target.offsetTop;
    deltaX = 0;
    deltaY = 0;
    clone = target.cloneNode(true);
    target.style.opacity = "0";
    clone.style.position = "absolute";
    clone.style.gridArea = "unset";
    clone.style.width = target.offsetWidth + "px";
    clone.style.height = target.offsetHeight + "px";
    clone.style.left = startX + "px";
    clone.style.top = startY + "px";
    clone.style.border = "1px solid var(--color)";
    clone.style.opacity = "0.5";
    clone.style.scale = "0.9";
    clone.style.pointerEvents = "none";
    clone.id = "candy-doc-clone";
    target.classList.add("dragging");
    target.parentElement.append(clone);
  });
  window.addEventListener("mousemove", (e) => {
    if (!target || !clone || !isDragging) return;
    deltaX += e.movementX/zoom;
    deltaY += e.movementY/zoom;
    let x = startX + deltaX;
    let y = startY + deltaY;
    const maxX = target.parentElement.offsetWidth - target.offsetWidth;
    const maxY = target.parentElement.offsetHeight - target.offsetHeight;
    if (x > maxX) {
      x = maxX;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > maxY) {
      y = maxY;
    }
    if (y < 0) {
      y = 0;
    }
    clone.style.left = x + "px";
    clone.style.top = y + "px";
    const others = [...target.parentElement.children]
    .filter((c) => {
      return c.id != "candy-doc-clone";
    })
    .filter((c) => {
      return c.id != target.id;
    });
    const rect = clone.getBoundingClientRect();
    for (let index = 0; index < others.length; index++) {
      const otherCell = others[index];
      const otherRect = otherCell.getBoundingClientRect();
      
      if (isInside(otherRect, rect,50) ||isInside(rect, otherRect,80) ) {
        
        tableSwap(target.parentElement,target, otherCell);
      }
    }
  

    
  });
  window.addEventListener("mouseup", (e) => {
    if (!target || !clone || !isDragging) return;
    
    isDragging = false;
    target.style.opacity = "1";
    target.classList.remove("dragging");
    clone?.remove();
    target = null;
    clone = null;
  });
}


