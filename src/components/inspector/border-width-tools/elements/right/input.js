import { getSelected, getSelectedElements } from "../../../../selection/index.js";

export const input = document.createElement("input");
input.classList.add("candyDoc__inspectorBorderWidthController");
input.type = "number";
input.value = "1";
input.min = "1";
input.max = "50";
input.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected=>{
    selected.querySelector(".target").style.borderRightWidth = e.target.value + "px";

  })
 });




