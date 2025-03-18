import { createRect } from "../../../diagram/DiagramRect.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { getSelected } from "../../../selection/index.js";
export const rect = document.createElement("div");
rect.classList.add("candyDoc__inspectorDiagramRect", "candyDoc__icon");
rect.innerHTML =
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
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="var(--color)"
      strokeWidth="0.576"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></rect>
  </g>
</svg>
`;

rect.addEventListener("mousedown", () => {
  const selected = getSelected();
  const rectElement = createRect();
  if (selected?.classList?.contains("candyDoc__diagramWrapper")) {
    selected?.querySelector(".target")?.append(rectElement);
  } else if (findAncestor(selected, "candyDoc__diagramWrapper")) {
    findAncestor(selected, "candyDoc__diagramWrapper")
      ?.querySelector(".target")
      ?.append(rectElement);
  }
});
