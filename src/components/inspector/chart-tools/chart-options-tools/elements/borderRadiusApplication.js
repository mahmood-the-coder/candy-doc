import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
export const borderRadiusApplication = document.createElement("div");
borderRadiusApplication.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemBorderRadiusApplication"
);

borderRadiusApplication.dataset.option = "borderRadiusApplication";
borderRadiusApplication.dataset.chartType = "bar rangeBar";
const multiChoices = getMultiChoices([
  { label: "End", value: "end" },
  { label: "Around", value: "around" },
],"Border Radius Application","around");
borderRadiusApplication.append(multiChoices);

multiChoices.addEventListener("mousedown", (e) => {
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
        borderRadiusApplication: e.target.dataset.value,
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

   multiChoices.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoices.querySelector(`[data-value='${options?.plotOptions?.bar?.borderRadiusApplication}']`)?.classList?.add("candyDoc__multiChoiceSelected")
  filterChartOptions(selected)

 
})