import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const barHeight = document.createElement("div");
barHeight.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemBarHeight"
);
const barHeightController = document.createElement("input");
barHeightController.classList.add(
  "candyDoc__inspectorChartOptionItemController"
);
barHeightController.type = "range";
barHeightController.value = 0;
barHeightController.min = 0;
barHeightController.max = 100;
const barHeightLabel = document.createElement("div");
barHeightLabel.classList.add("candyDoc__inspectorChartOptionBarHeightLabel");
barHeightLabel.innerText = "Bar Height";
barHeight.dataset.option = "barHeight";
barHeight.dataset.chartType = "rangeBar boxPlot";
barHeight.append(barHeightLabel, barHeightController);
barHeightController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    plotOptions: {
      ...options.plotOptions,
      bar: {
        ...(options.plotOptions?.bar ?? undefined),
        barHeight: e.target.value,
      },
    },
  }
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options?.plotOption?.bar?.isHorizontal) {
    barHeight.style.display = "none"
  }
  if (!options) return;
  barHeight.value = options?.plotOptions?.bar?.barHeight
    filterChartOptions(selected)

})