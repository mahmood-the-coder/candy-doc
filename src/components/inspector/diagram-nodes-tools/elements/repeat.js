import { createRepeat } from "../../../diagram/DiagramRepeat.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { getSelected } from "../../../selection/index.js";
export const repeat = document.createElement("div");
repeat.classList.add("candyDoc__inspectorDiagramRepeat", "candyDoc__icon");
repeat.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M10.0001 17H8.00098C4.68727 17 2.00098 14.3137 2.00098 11C2.00098 7.68629 4.68727 5 8.00098 5H16.0001C19.3138 5 22.0001 7.68629 22.0001 11C22.0001 14.3137 19.3138 17 16.0001 17H14.0001M17.0001 20L14.0001 17M14.0001 17L17.0001 14"
      stroke="var(--color)"
      strokeWidth="0.696"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </g>
</svg>

`;

repeat.addEventListener("mousedown", () => {
  const selected = getSelected();
  const rectElement = createRepeat();
  if (selected?.classList?.contains("candyDoc__diagramWrapper")) {
    selected?.querySelector(".target")?.append(rectElement);
  } else if (findAncestor(selected, "candyDoc__diagramWrapper")) {
    findAncestor(selected, "candyDoc__diagramWrapper")
      ?.querySelector(".target")
      ?.append(rectElement);
  }
});
