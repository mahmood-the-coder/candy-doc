import { createColorInput } from "../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../selection/index.js";

export const stroke = document.createElement("div");
stroke.classList.add("candyDoc__inspectorStroke");
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorStrokeLabel");
label.innerText = "Stroke";
const colorInput = createColorInput();
stroke.append(label, colorInput);

colorInput.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.style.stroke = e.target.value;
  colorInput.style.color=e.target.value
  colorInput.style.backgroundColor=e.target.value
});


