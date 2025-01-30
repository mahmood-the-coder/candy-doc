import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const lineDash = document.createElement("div");
lineDash.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemLineDash"
);
const lineDashController = document.createElement("input");
lineDashController.classList.add(
  "candyDoc__inspectorChartOptionItemController"
);
lineDashController.type = "range";
lineDashController.value = 0;
lineDashController.min=0;
lineDashController.max=100;
const lineDashLabel = document.createElement("div");
lineDashLabel.classList.add("candyDoc__inspectorChartOptionItemLineDashLabel");
lineDashLabel.innerText = "Line Dash";
lineDash.dataset.option = "lineDash";
lineDash.dataset.chartType = "line area boxPlot";
lineDash.append(lineDashLabel, lineDashController);
lineDashController.addEventListener("input", (e) => {
    const selected = getSelected();
    if (!selected) return;
    let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
    if (!options) return;
    options = {
      ...options,
      stroke:{
          ...options?.stroke??undefined,
          dashArray:e.target.value
      }
    };
    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options)
});
window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  lineDashController.value=options.stroke.dashArray
  filterChartOptions(selected)
})