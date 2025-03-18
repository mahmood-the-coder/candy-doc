import { leftRuler } from "./left.js";
import { getCenterLayoutElement } from "../../layout/index.js";

export const rightRuler = document.createElement("div");
rightRuler.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleRight",
  "candyDoc__icon"
);
rightRuler.innerHTML =
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

  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleRight")) return;

    const page=document.body.querySelector(".candyDoc__pagesWrapper")
    const pageScale=(page.getBoundingClientRect().width/page.offsetWidth)
    zoom=window.devicePixelRatio *pageScale; 

   
    contents = document.body.querySelectorAll(".candyDoc__content");

   draggable= [...getCenterLayoutElement().querySelectorAll(".draggable"),getCenterLayoutElement().querySelector(".candyDoc__cursor")]
    const pages = document.body.querySelectorAll(".candyDoc__page");
    pages.forEach((p) => {
      const header = p.querySelector(".candyDoc__pageHeader");
      draggable = [...draggable, ...header.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
      const footer = p.querySelector(".candyDoc__pageFooter");
      draggable = [...draggable, ...footer.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
      const rightContainer = p.querySelector(".candyDoc__rightContainer");
      draggable = [...draggable, ...rightContainer.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
    });
    draggable.forEach((d) => {
      d.dataset.startX = d.offsetLeft.toString();
    });

    window.addEventListener("mousemove", handleMouseMove);
    deltaX = 0;
    startX = parseInt(window.getComputedStyle(rightRuler).right.replace("px", ""));
    
  });

  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
    
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
    rightRuler.style.right = x + "px";

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
        rightRuler.offsetLeft - d.offsetWidth - leftRuler.offsetLeft + rightRuler.offsetWidth
      ) {
        x =
          rightRuler.offsetLeft -
          d.offsetWidth -
          leftRuler.offsetLeft +
          rightRuler.offsetWidth;
      }
      if (d.parentElement.classList.contains("candyDoc__rightContainer")) {
        if(rightRuler.offsetLeft>479)
        x = startX + deltaX;
        if (x < 0) {
          x = 0;
        }
      }
 
      
      d.style.left = x + "px";
    });
   
  
  }
}
