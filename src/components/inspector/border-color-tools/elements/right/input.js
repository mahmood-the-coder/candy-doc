import { createColorInput } from "../../../../editor-UI/color/index.js";
import { getSelected, getSelectedElements } from "../../../../selection/index.js";
export const input = createColorInput();
input.classList.add("candyDoc__inspectorBorderColorController");
input.value = "#000000";

input.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected=>{
    selected.querySelector(".target").style.borderRightColor = e.target.value;

  })
});




