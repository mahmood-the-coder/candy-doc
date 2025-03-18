import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const borderRadius = document.createElement("div");
borderRadius.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemBorderRadius"
);
const borderRadiusController = document.createElement("input");
borderRadiusController.classList.add(
  "candyDoc__inspectorChartOptionItemController"
);
borderRadiusController.type = "range";
borderRadiusController.value = 0;
borderRadiusController.min=0;
borderRadiusController.max=100;
const borderRadiusLabel = document.createElement("div");
borderRadiusLabel.classList.add("candyDoc__inspectorChartOptionItemBorderRadiusLabel");
borderRadiusLabel.innerText = "Border Radius";
borderRadius.dataset.option = "borderRadius";
borderRadius.dataset.chartType = "bar rangeBar";
borderRadius.append(borderRadiusLabel, borderRadiusController);
borderRadiusController.addEventListener("input", (e) => {
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
        borderRadius: e.target.value,
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
  if (!options) return;
  borderRadius.value = options?.plotOptions?.bar?.borderRadius
    filterChartOptions(selected)

})