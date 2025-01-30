import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const strokeWidth = document.createElement("div");
strokeWidth.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemStrokeWidth"
);
const strokeWidthController = document.createElement("input");
strokeWidthController.classList.add(
  "candyDoc__inspectorChartOptionItemController"
);
strokeWidthController.type = "range";
strokeWidthController.value = 0;
strokeWidthController.min=1;
strokeWidthController.max=20;
const strokeWidthLabel = document.createElement("div");
strokeWidthLabel.classList.add("candyDoc__inspectorChartOptionItemStrokeLabel");
strokeWidthLabel.innerText = "line width";
strokeWidth.dataset.option = "strokeWidth";
strokeWidth.dataset.chartType = "line area";
strokeWidth.append(strokeWidthLabel, strokeWidthController);
strokeWidthController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    stroke: {
        ...options?.stroke?? undefined,
        width: e.target.value,
    }
  }
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});

window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  strokeWidthController.value=options.stroke.width
  filterChartOptions(selected)
})