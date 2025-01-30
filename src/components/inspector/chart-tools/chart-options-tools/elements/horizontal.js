import { getToggle, setToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
import { barHeight } from "./barHeight.js";
import { columnWidth } from "./columnWidth.js";
import { isFunnel } from "./isFunnel.js";

export const horizontal = document.createElement("div");
horizontal.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemHorizontal"
);
horizontal.dataset.option = "horizontal";
horizontal.dataset.chartType = "bar rangeBar boxPlot";
const toggle = getToggle("Horizontal", false);
horizontal.append(toggle);

toggle.addEventListener("input", (e) => {
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
        horizontal: e.target.checked,
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  if (!options?.plotOption?.bar?.horizontal) {
    barHeight.style.display = "none"
    isFunnel.style.display = "none";
  }
  else
  {
    barHeight.style.display = "flex"
    isFunnel.style.display = "flex";
  }
  renderApexChart(options)
});
window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options?.plotOption?.bar?.horizontal) {
    barHeight.style.display = "none"
    columnWidth.style.display="flex"
    isFunnel.style.display = "none";
  }
  else
  {
    isFunnel.style.display = "flex";
    barHeight.style.display = "flex"
    columnWidth.style.display="none"
  }
  if (!options) return;
  horizontal.value = options?.plotOptions?.bar?.horizontal
  setToggle(horizontal,horizontal.value)
    filterChartOptions(selected)

})