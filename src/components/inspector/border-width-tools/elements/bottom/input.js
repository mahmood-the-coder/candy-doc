import { getSelected } from "../../../../selection/index.js";

export const input = document.createElement("input");
input.classList.add("candyDoc__inspectorBorderWidthController");
input.type = "number";
input.value = "1";
input.min = "1";
input.max = "50";
input.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderBottomWidth = e.target.value + "px";
});




