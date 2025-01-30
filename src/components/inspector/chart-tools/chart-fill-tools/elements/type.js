import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getCenterLayoutElement } from "../../../../layout/index.js";
import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { updateApexChart,renderApexChart } from "../../render.js";
updateApexChart
export const fillType = document.createElement("div");
fillType.classList.add("candyDoc__inspectorChartOptionItem");

const multiChoice = getMultiChoices(
   
    [
        {label:"Solid",value:"solid"},
        {label:"Pattern",value:"pattern"},
    ]
    ,
    "Type",
    "solid",
);

fillType.append(multiChoice);

multiChoice.addEventListener("mousedown",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
    if (!options) return;
    console.log(e.target.dataset.value);
    
    options = {
      ...options,
      fill:{
        ...options?.fill ?? undefined,
        type:e.target.dataset.value,
      }
    };
    if(options.fill.type=="pattern")
    {
        getInspector().querySelector(".candyDoc__inspectorChartPattern").style.display="flex"
    }
    else
    {
        getInspector().querySelector(".candyDoc__inspectorChartPattern").style.display="none"

    }
    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options)
})
window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if(!getCenterLayoutElement().contains(e.target))return;
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

   multiChoice.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoice.querySelector(`[data-value='${options?.fill?.type}']`)?.classList?.add("candyDoc__multiChoiceSelected")

 
})