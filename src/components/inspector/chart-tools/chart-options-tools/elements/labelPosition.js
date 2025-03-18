import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
// container
export const labelPosition = document.createElement("div");
labelPosition.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemLabelPosition"
);
labelPosition.dataset.option = "labelPosition";
labelPosition.dataset.chartType = "bar rangeBar heatmap treemap";

const multiChoice = getMultiChoices([
  { label: "Top", value: "top" },
  { label: "Center", value: "center" },
  { label: "Bottom", value: "bottom" },
],"Label Position","center");
labelPosition.append(multiChoice);
multiChoice.addEventListener("mousedown", (e) => {
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
        dataLabels: {
          ...(options?.plotOptions?.bar?.dataLabels ?? undefined),
          position:e.target.dataset.value,
        },
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

   multiChoice.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoice.querySelector(`[data-value='${options?.plotOptions?.bar?.dataLabels?.position}']`)?.classList?.add("candyDoc__multiChoiceSelected")

   filterChartOptions(selected)

})