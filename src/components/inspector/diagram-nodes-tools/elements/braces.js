import { createBraces } from "../../../diagram/DiagramBraces.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { getSelected } from "../../../selection/index.js";
export const braces = document.createElement("div");
braces.classList.add("candyDoc__inspectorDiagramBraces", "candyDoc__icon");
braces.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
  stroke="var(--color)"
  strokeWidth="0.00024000000000000003"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M9 3v2H6v14h3v2H4V3h5zm6 0h5v18h-5v-2h3V5h-3V3z"></path>
    </g>
  </g>
</svg>
`;

braces.addEventListener("mousedown", () => {
  const selected = getSelected();
  const rectElement = createBraces();
  if (selected?.classList?.contains("candyDoc__diagramWrapper")) {
    selected?.querySelector(".target")?.append(rectElement);
  } else if (findAncestor(selected, "candyDoc__diagramWrapper")) {
    findAncestor(selected, "candyDoc__diagramWrapper")
      ?.querySelector(".target")
      ?.append(rectElement);
  }
});
