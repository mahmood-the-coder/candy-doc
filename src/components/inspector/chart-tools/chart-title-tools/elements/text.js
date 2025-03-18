import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const titleText = document.createElement("div");
const input = document.createElement("input");

input.addEventListener("input", (e) => {
  const selected = getSelected();
  
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    title: {
      ...(options?.title ?? undefined),
      text: e.target.value,
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options);
});

window.addEventListener("mouseup", (e) => {
  if(!getCenterLayoutElement().contains(e.target))return;
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  input.value = options?.title?.text ?? "Chart Title";
  selected.dataset.chartOptions=JSON.stringify(options)
});

titleText.append(input);
