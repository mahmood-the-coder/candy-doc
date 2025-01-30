import { barHeight } from "./barHeight.js";
import { borderRadius } from "./borderRadius.js";
import { borderRadiusApplication } from "./borderRadiusApplication.js";
import { columnWidth } from "./columnWidth.js";
import { curve } from "./curve.js";
import { dataLabels } from "./dataLabels.js";
import { horizontal } from "./horizontal.js";
import { isFunnel } from "./isFunnel.js";
import { label } from "./label.js";
import { labelPosition } from "./labelPosition.js";
import { lineDash } from "./lineDash.js";
import { strokeWidth } from "./strokeWidth.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__inspectorToolsWrapper", "candyDoc__inspectorChartToolsWrapper")
wrapper.append(label, horizontal, barHeight, isFunnel, borderRadius, borderRadiusApplication, dataLabels, labelPosition, columnWidth, strokeWidth, curve, lineDash)


const toggle = document.createElement("div");
toggle.classList.add("candyDoc__inspectorToolsWrapperToggle", "candyDoc__icon")
toggle.innerHTML =/*html*/
  `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M7 11H17V13H7V11Z" fill="var(--color)"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H2V22H22V2ZM20 4H4V20H20V4Z" fill="var(--color)"></path>
    </g>
  </svg>
`

wrapper.append(toggle)

wrapper.style.minHeight = "40px"
wrapper.style.height="40px"
toggle.addEventListener("mousedown", (e) => {
  if (toggle.parentElement.offsetHeight > 40) {
    toggle.parentElement.style.minHeight = "40px"
    toggle.parentElement.style.height = "40px"
    toggle.parentElement.style.overflowY = "hidden"

  }
  else {
    toggle.parentElement.style.height = "auto"
    wrapper.style.minHeight = "auto"
    toggle.parentElement.style.overflowY = "unset"
  }

})