import { createColorInput } from "../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../selection/index.js";

export const fill = document.createElement("div");
fill.classList.add("candyDoc__inspectorFill");
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorFillLabel");
label.innerText = "fill";
const colorInput = createColorInput();
fill.append(label, colorInput);

colorInput.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.style.fill = e.target.value;
  colorInput.style.color=e.target.value;
  colorInput.style.backgroundColor=e.target.value;
});
