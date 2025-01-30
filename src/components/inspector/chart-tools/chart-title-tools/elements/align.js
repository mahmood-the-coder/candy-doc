import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const titleAlign=document.createElement("div");
titleAlign.classList.add("candyDoc__inspectorChartTitleAlign","candyDoc__inspectorChartOptionItem");


const multiChoice=getMultiChoices(
    [
        {label:"Left",value:"left"},
        {label:"Center",value:"center"},
        {label:"Right",value:"right"},
    ]
    ,
    "Align",
    "center"
)

titleAlign.append(multiChoice);
multiChoice.addEventListener("mousedown",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
    if (!options) return;
    options = {
      ...options,
      title: {
        ...(options?.title ?? undefined),
        align:e.target.dataset.value,
      },
    };
    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options);
})

window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

   multiChoice.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoice.querySelector(`[data-value='${options?.title?.align}']`)?.classList?.add("candyDoc__multiChoiceSelected")

 
})