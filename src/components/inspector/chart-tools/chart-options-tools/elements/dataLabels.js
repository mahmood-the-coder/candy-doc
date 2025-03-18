import { getToggle,setToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
import { labelPosition } from "./labelPosition.js";
export const dataLabels = document.createElement("div");
dataLabels.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemDataLabels"
);
dataLabels.dataset.option = "dataLabels";
dataLabels.dataset.chartType = "bar rangeBar line area boxPlot heatmap treemap donut radar";
const toggle=getToggle("Show Labels",true);
dataLabels.append(toggle);

toggle.querySelector("input").addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    dataLabels: {
      ...(options?.dataLabels ?? undefined),
      enabled: e.target.checked,
    }
  };

  if (labelPosition.dataset.chartType.includes(options.chart.type)) {
    labelPosition.style.display = "flex";
  } else {
    labelPosition.style.display = "none";
  }
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
  
});
window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (e.target.checked && labelPosition.dataset.chartType.includes(options.chart.type)) {
    labelPosition.style.display = "flex";
  } else {
    labelPosition.style.display = "none";
  }
  if (!options) return;
  dataLabels.value = options?.dataLabels?.enabled
  setToggle(dataLabels,dataLabels.value)
    filterChartOptions(selected)

})
