import { insertOrderedList } from "../../ordered-list/index.js";
import { insertUnorderedList } from "../../unordered-list/index.js";

export const unorderedList = document.createElement("div");
unorderedList.dataset.tooltip="Ordered List"
unorderedList.classList.add("candyDoc__icon","insertUnorderedList");
unorderedList.innerHTML =
  /*html*/
  `
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M3 1H1V3H3V1Z" fill="var(--color)"></path>
    <path d="M3 5H1V7H3V5Z" fill="var(--color)"></path>
    <path d="M1 9H3V11H1V9Z" fill="var(--color)"></path>
    <path d="M3 13H1V15H3V13Z" fill="var(--color)"></path>
    <path d="M15 1H5V3H15V1Z" fill="var(--color)"></path>
    <path d="M15 5H5V7H15V5Z" fill="var(--color)"></path>
    <path d="M5 9H15V11H5V9Z" fill="var(--color)"></path>
    <path d="M15 13H5V15H15V13Z" fill="var(--color)"></path>
  </g>
</svg>
`;

window.addEventListener("mouseup", (e) => {
  if(!e.target.classList.contains("insertUnorderedList"))return;

  insertUnorderedList()
});
