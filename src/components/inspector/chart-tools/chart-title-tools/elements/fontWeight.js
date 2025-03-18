import { getNumberInput } from "../../../../editor-UI/number/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const titleFontWeight = document.createElement("div");
titleFontWeight.classList.add(
  "candyDoc__inspectorChartTitleAlign",
  "candyDoc__inspectorChartOptionItem"
);

const numberInput = getNumberInput("Font Weight",true, 700, 100, 900, 100,(value)=>{
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
        fontWeight: value
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options);
});

titleFontWeight.append(numberInput);


