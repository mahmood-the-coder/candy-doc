import { getSelected } from "../../../selection/index.js";

export const noRepeat = document.createElement("div");
noRepeat.classList.add("candyDoc__icon","candyDoc__toggle","candyDoc__inspectorNoRepeatIcon");
noRepeat.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="0 0 20 20"
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
      d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zM2.399 10a7.6 7.6 0 0 1 12.417-5.877L4.122 14.817A7.568 7.568 0 0 1 2.399 10zm7.6 7.599a7.56 7.56 0 0 1-4.815-1.722L15.878 5.184a7.6 7.6 0 0 1-5.879 12.415z"
    ></path>
  </g>
</svg>

`;

noRepeat.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;
  selected.style.backgroundRepeat = "no-repeat";
});
