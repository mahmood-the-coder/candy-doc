import { getToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const showGrid = document.createElement("div");
showGrid.classList.add("candyDoc__inspectorChartOptionItem");
const toggle = getToggle("show", true);
showGrid.append(toggle);
toggle.querySelector("input").addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    grid: {
      ...(options?.grid ?? undefined),
      show: e.target.checked,
    },
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
