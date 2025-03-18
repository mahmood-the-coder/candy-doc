import { insertOrderedList } from "../../ordered-list/index.js";

export const orderedList = document.createElement("div");
orderedList.dataset.tooltip="Ordered List"
orderedList.classList.add("candyDoc__icon","insertOrderedList");
orderedList.innerHTML =
  /*html*/
  `
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M6.99999 1H15V3H6.99999V1Z" fill="var(--color)"></path>
    <path d="M6.99999 5H15V7H6.99999V5Z" fill="var(--color)"></path>
    <path d="M15 9H6.99999V11H15V9Z" fill="var(--color)"></path>
    <path d="M6.99999 13H15V15H6.99999V13Z" fill="var(--color)"></path>
    <path
      d="M3.28854 10.75H0.999993V9H3.28854C4.30279 9 5.12499 9.82221 5.12499 10.8364C5.12499 11.3407 4.91763 11.8228 4.55155 12.1696L3.41116 13.25H4.99999V15H0.999993V13.1236L3.348 10.8992C3.36523 10.8829 3.37499 10.8602 3.37499 10.8364C3.37499 10.7887 3.33629 10.75 3.28854 10.75Z"
      fill="var(--color)"></path>
    <path d="M2.358 1.125L0.723297 1.6699L1.2767 3.3301L2.125 3.04733V7H3.875V1.125H2.358Z" fill="var(--color)"></path>
  </g>
</svg>
`;

window.addEventListener("mouseup", (e) => {
  if(!e.target.classList.contains("insertOrderedList"))return;

  insertOrderedList()
});
