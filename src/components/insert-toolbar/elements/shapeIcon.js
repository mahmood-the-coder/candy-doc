import { insertShape } from "../../shapes/index.js";

export const shapes = document.createElement("div");
shapes.dataset.tooltip="Shapes"
shapes.classList.add("candyDoc__icon","insertShape");
shapes.innerHTML =
  /*html*/
  `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M13.4303 15H4.40034C2.58034 15 1.42034 13.05 2.30034 11.45L4.63034 7.20994L6.81034 3.23994C7.72034 1.58994 10.1003 1.58994 11.0103 3.23994L13.2003 7.20994L14.2503 9.11995L15.5303 11.45C16.4103 13.05 15.2503 15 13.4303 15Z"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      opacity="0.4"
      d="M22 15.5C22 19.09 19.09 22 15.5 22C11.91 22 9 19.09 9 15.5C9 15.33 9.01 15.17 9.02 15H13.43C15.25 15 16.41 13.05 15.53 11.45L14.25 9.12C14.65 9.04 15.07 9 15.5 9C19.09 9 22 11.91 22 15.5Z"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </g>
</svg>

`;


window.addEventListener("mousedown",(e)=>{
  if(!e.target.classList.contains("insertShape"))return;

  insertShape()
})

