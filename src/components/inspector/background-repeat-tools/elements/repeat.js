import { getSelected } from "../../../selection/index.js";

export const repeat = document.createElement("div");
repeat.classList.add("candyDoc__icon","candyDoc__toggle","candyDoc__inspectorNoRepeatIcon");
repeat.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="-5.5 0 32 32"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <title>tile</title>
    <path
      d="M0 14.875h9.281v-9.281h-9.281v9.281zM11.531 14.875h9.281v-9.281h-9.281v9.281zM0 26.406h9.281v-9.281h-9.281v9.281zM11.531 26.406h9.281v-9.281h-9.281v9.281z"
    ></path>
  </g>
</svg>

`;

repeat.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;
  selected.style.backgroundRepeat = "repeat";
});
