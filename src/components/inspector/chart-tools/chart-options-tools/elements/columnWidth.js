import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const columnWidth = document.createElement("div");
columnWidth.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemColumnWidth"
);
const columnWidthController = document.createElement("input");
columnWidthController.classList.add(
  "candyDoc__inspectorChartOptionItemController"
);
columnWidthController.type = "range";
columnWidthController.value = 0;
columnWidthController.min=0;
columnWidthController.max=100;
const columnWidthLabel = document.createElement("div");
columnWidthLabel.classList.add("candyDoc__inspectorChartOptionColumnWidthLabel");
columnWidthLabel.innerText = "Column Width";
columnWidth.dataset.option = "columnWidth";
columnWidth.dataset.chartType = "bar boxPlot candlestick";
columnWidth.append(columnWidthLabel, columnWidthController);
columnWidthController.addEventListener("input", (e) => {
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
        columnWidth: e.target.value,
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
  if (options?.plotOption?.bar?.isHorizontal ) {
    columnWidth.style.display = "none"
  }
  if (!options) return;
  columnWidth.value = options?.plotOptions?.bar?.columnWidth
    filterChartOptions(selected)

})