import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const xAxisPosition = document.createElement("div");
const multiChoice = getMultiChoices(
  [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ],
  "Position",
  "bottom"
);
xAxisPosition.classList.add("candyDoc__inspectorChartOptionItem")
xAxisPosition.append(multiChoice);

multiChoice.addEventListener("mousedown",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  
    options = {
      ...options,
      xaxis: {
        ...(options?.xaxis ?? undefined),
        position:e.target.dataset.value,
      },
    };
  
    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options)
})

window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

   multiChoice.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoice.querySelector(`[data-value='${options?.xaxis?.position}']`)?.classList?.add("candyDoc__multiChoiceSelected")

 
})