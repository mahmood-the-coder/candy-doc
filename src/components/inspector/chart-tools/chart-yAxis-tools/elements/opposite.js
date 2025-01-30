import { getToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const oppositeYAxis = document.createElement("div");
oppositeYAxis.classList.add("candyDoc__inspectorChartOptionItem")
const toggle = getToggle("Opposite", false);
oppositeYAxis.append(toggle);
toggle.querySelector("input").addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    yaxis: {
      ...(options?.yaxis ?? undefined),
      opposite: e.target.checked,
    },
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});