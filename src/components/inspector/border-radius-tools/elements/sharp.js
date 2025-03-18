import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const sharp=document.createElement("div");
sharp.classList.add("candyDoc__icon","candyDoc__toggle");
sharp.innerHTML=/*html*/
`
<svg
  style="pointer-events: none"
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
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
      d="M3 3h2v2H3V3zm0 4h2v2H3V7zm2 4H3v2h2v-2zm-2 4h2v2H3v-2zm2 4H3v2h2v-2zm2 0h2v2H7v-2zm6 0h-2v2h2v-2zm2 0h2v2h-2v-2zm6 0h-2v2h2v-2zm-2-4h2v2h-2v-2zm2-2V3H11v2h8v8h2zM7 3h2v2H7V3z"
      fill="var(--color)"
    ></path>
  </g>
</svg>

`
sharp.addEventListener("mouseup", () => {
  const selectedElements = getSelectedElements()
    selectedElements.forEach(selected=>{
      selected.querySelector(".target").style.borderRadius = "3px"

    })
})

