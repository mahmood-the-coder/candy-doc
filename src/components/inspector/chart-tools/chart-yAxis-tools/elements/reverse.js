import { getToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const reverseYAxis = document.createElement("div");
reverseYAxis.classList.add("candyDoc__inspectorChartOptionItem")
const toggle = getToggle("Reveres", false);
reverseYAxis.append(toggle);
toggle.querySelector("input").addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    yaxis: {
      ...(options?.yaxis ?? undefined),
      reversed: e.target.checked,
    },
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});