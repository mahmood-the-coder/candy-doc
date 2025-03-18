import { createColorInput } from "../../../../editor-UI/color/index.js";
import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const titleColor = document.createElement("div");
titleColor.classList.add("candyDoc__inspectorChartOptionItem");

const colorInput = createColorInput();
colorInput.value = "#000000";
colorInput.style.color = "#000000";
colorInput.style.backgroundColor = "#000000";
titleColor.append(colorInput);
colorInput.addEventListener("input", (e) => {
  colorInput.value = e.target.value
  colorInput.style.backgroundColor = colorInput.value;
  colorInput.style.color = colorInput.value;
  const selected = getSelected();

  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    title: {
      ...(options?.title ?? undefined),
      style: {
        ...(options?.title?.style ?? undefined),
        color: e.target.value,
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options);
});

window.addEventListener("mouseup", (e) => {
  if (!getCenterLayoutElement().contains(e.target)) return;
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  colorInput.value = options?.title?.style?.color ?? "#000000";
  colorInput.style.backgroundColor = colorInput.value;
  colorInput.style.color = colorInput.value;
});

