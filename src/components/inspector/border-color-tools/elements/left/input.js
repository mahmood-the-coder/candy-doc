import { getColorInput } from "../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../selection/index.js";
export const input = getColorInput();
input.classList.add("candyDoc__inspectorBorderColorController");
input.value = "#000000";

input.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderLeftColor = e.target.value;
});




