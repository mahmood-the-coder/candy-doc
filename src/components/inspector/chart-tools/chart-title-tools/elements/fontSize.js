import { getNumberInput } from "../../../../editor-UI/number/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const titleFontSize = document.createElement("div");
titleFontSize.classList.add(
  "candyDoc__inspectorChartTitleAlign",
  "candyDoc__inspectorChartOptionItem"
);

const numberInput = getNumberInput("Font Size",true, 16, 1, 50, 1,(value)=>{
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
        fontSize: value + "px",
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options);
});

titleFontSize.append(numberInput);

