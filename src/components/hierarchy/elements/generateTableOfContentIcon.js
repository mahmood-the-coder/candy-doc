import { numberPages } from "../../pages/elements/numberPages.js"
import { generateTableOfContent } from "../../table-of-content/index.js"

export const tableOfContentIcon = document.createElement("div")
tableOfContentIcon.dataset.tooltip = "generate content list"
tableOfContentIcon.classList.add("candyDoc__icon")
tableOfContentIcon.innerHTML =/*html*/
  `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M8 8H20M11 12H20M14 16H20M4 8H4.01M7 12H7.01M10 16H10.01" stroke="var(--color)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
</svg>
`
tableOfContentIcon.addEventListener("mousedown", () => {
  numberPages()
  generateTableOfContent()
})