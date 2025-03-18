import { createDiamond } from "../../../diagram/DiagramDiamond.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { getSelected } from "../../../selection/index.js";
export const diamond = document.createElement("div");
diamond.classList.add("candyDoc__inspectorDiagramDiamond", "candyDoc__icon");
diamond.innerHTML =
  /*html*/
  `

<svg
  width="15px"
  height="15px"
  viewBox="0 0 24.00 24.00"
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
      d="M4.26244 14.2628C3.47041 13.4707 3.07439 13.0747 2.92601 12.618C2.7955 12.2164 2.7955 11.7837 2.92601 11.382C3.07439 10.9253 3.47041 10.5293 4.26244 9.73727L9.73703 4.26268C10.5291 3.47065 10.9251 3.07463 11.3817 2.92626C11.7834 2.79574 12.2161 2.79574 12.6178 2.92626C13.0745 3.07463 13.4705 3.47065 14.2625 4.26268L19.7371 9.73727C20.5291 10.5293 20.9251 10.9253 21.0735 11.382C21.204 11.7837 21.204 12.2164 21.0735 12.618C20.9251 13.0747 20.5291 13.4707 19.7371 14.2628L14.2625 19.7373C13.4705 20.5294 13.0745 20.9254 12.6178 21.0738C12.2161 21.2043 11.7834 21.2043 11.3817 21.0738C10.9251 20.9254 10.5291 20.5294 9.73703 19.7373L4.26244 14.2628Z"
      stroke="var(--color)"
      stroke-width="0.576"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </g>
</svg>
`;

diamond.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  const rectElement = createDiamond();
  if (selected?.classList?.contains("candyDoc__diagramWrapper")) {
    selected?.querySelector(".target")?.append(rectElement);
  } else if (findAncestor(selected, "candyDoc__diagramWrapper")) {
    findAncestor(selected, "candyDoc__diagramWrapper")
      ?.querySelector(".target")
      ?.append(rectElement);
  }
});
