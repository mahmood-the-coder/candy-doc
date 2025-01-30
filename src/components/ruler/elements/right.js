import { left } from "./left.js";
import { getCenterLayoutElement } from "../../layout/index.js";
import { setRunningEditorDimensions } from "./runnigEditorSize.js";

export const right = document.createElement("div");
right.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleRight",
  "candyDoc__icon"
);
right.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  height="15px"
  width="15px"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 24 24"
  xml:space="preserve"

>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <polygon
      style="fill-rule: evenodd; clip-rule: evenodd"
      points="3,6 21,6 12,19 "
    ></polygon>
  </g>
</svg>

`;
export function initRulerRightHandle() {
  let startX = 0;
  let deltaX = 0;
  let zoom=1
  let contents;
  let draggable = [];
  let cursor = null;
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleRight")) return;

    const page=document.body.querySelector(".candyDoc__pagesWrapper")
    const pageScale=(page.getBoundingClientRect().width/page.offsetWidth)
    zoom=window.devicePixelRatio *pageScale; 

    cursor = document.body.querySelector(".candyDoc__cursor");
    cursor.dataset.startX = cursor.offsetLeft.toString();
    contents = document.body.querySelectorAll(".candyDoc__content");

   draggable=getCenterLayoutElement().querySelectorAll(".draggable")
    const pages = document.body.querySelectorAll(".candyDoc__page");
    pages.forEach((p) => {
      const header = p.querySelector(".candyDoc__pageHeader");
      draggable = [...draggable, ...header.children].filter((i) =>
        i.classList.contains("draggable")
      );
      const footer = p.querySelector(".candyDoc__pageFooter");
      draggable = [...draggable, ...footer.children].filter((i) =>
        i.classList.contains("draggable")
      );
      const rightContainer = p.querySelector(".candyDoc__rightContainer");
      draggable = [...draggable, ...rightContainer.children].filter((i) =>
        i.classList.contains("draggable")
      );
    });
    draggable.forEach((d) => {
      d.dataset.startX = d.offsetLeft.toString();
    });

    window.addEventListener("mousemove", handleMouseMove);
    deltaX = 0;
    startX = parseInt(window.getComputedStyle(right).right.replace("px", ""));
    contents?.forEach((c) => {
      c.style.borderRight = "1px solid var(--color)";
      c.style.borderRight = "1px solid var(--color)";
    });
  });

  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
    contents?.forEach((c) => {
      c.style.border = "none";
    });
  });
  function handleMouseMove(ev) {
    if (!contents || contents.length <= 0) return;
  
    deltaX -= ev.movementX/zoom;

    let x = startX + deltaX;

    if (x < 25) {
      x = 25;
      return;
    }

    const maxX = 300;
    if (x > maxX) {
      x = maxX;
      return;
    }
    right.style.right = x + "px";

    contents.forEach((c) => {
      c.style.right = x + "px";
    });

    
   
    document.body.querySelectorAll(".candyDoc__pageHeader").forEach((h) => {
      h.style.right = contents[0].style.right;
    });
    document.body.querySelectorAll(".candyDoc__pageFooter").forEach((h) => {
      h.style.right = contents[0].style.right;
    });
    document.body.querySelectorAll(".candyDoc__rightContainer").forEach((r) => {
      r.style.left = `calc(100% - ${contents[0].style.right})`;
    });
    draggable.forEach((d) => {
      const startX = parseFloat(d.dataset.startX);
      let x = startX;
      if (
        x >
        right.offsetLeft - d.offsetWidth - left.offsetLeft + right.offsetWidth
      ) {
        x =
          right.offsetLeft -
          d.offsetWidth -
          left.offsetLeft +
          right.offsetWidth;
      }
      if (d.parentElement.classList.contains("candyDoc__rightContainer")) {
        if(right.offsetLeft>479)
        x = startX + deltaX;
        if (x < 0) {
          x = 0;
        }
      }
 
      
      d.style.left = x + "px";
    });
    if (
      cursor.parentElement.classList.contains("candyDoc__content") ||
      cursor.parentElement.classList.contains(
        "candyDoc__runningFooterEditor"
      ) ||
      cursor.parentElement.classList.contains(
        "candyDoc__runningHeaderEditor"
      ) ||
      cursor.parentElement.classList.contains("candyDoc__rightContainer")
    ) {
      const cursorStartX = parseFloat(cursor.dataset.startX);
      let cursorX = cursorStartX;

      if (
        cursorX >
        right.offsetLeft -
          cursor.offsetWidth / 2 -
          left.offsetLeft +
          right.offsetWidth -
          2
      ) {
        cursorX =
          right.offsetLeft -
          cursor.offsetWidth / 2 -
          left.offsetLeft +
          right.offsetWidth -
          2;
      }
      if (cursor.parentElement.classList.contains("candyDoc__rightContainer")) {
        if(right.offsetLeft>maxX)
        cursorX = cursorStartX + deltaX;
        if (cursorX + cursor.offsetWidth / 2 - 3 < 0) {
          cursorX = 0 - cursor.offsetWidth / 2 + 3;
        }
      }
      cursor.style.left = cursorX + "px";
    }
    setRunningEditorDimensions()
  }
}
