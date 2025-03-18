import { createColorInput } from "../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const gridColor = document.createElement("div");
gridColor.classList.add("candyDoc__chartOptionsBorderColor");
const colorInput = createColorInput();
colorInput.type = "text";
const label = document.createElement("div");
label.innerText = "Grid Color";
label.classList.add("candyDoc__chartOptionsBorderColorLabel");
gridColor.append(label, colorInput);

colorInput.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    grid: {
      ...(options?.grid ?? undefined),
      borderColor: e.target.value,
    },
  };
  e.target.value = e.target.value;
  e.target.style.backgroundColor = e.target.value;
  e.target.style.color = e.target.value;
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
