import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { filterChartOptions } from "../index.js";
// container
export const curve = document.createElement("div");
curve.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemCurve"
);
curve.dataset.option = "curve";
curve.dataset.chartType = "line area rangeArea";
// all controller wrapper
const controllerWrapper = document.createElement("div");
controllerWrapper.classList.add("candyDoc__inspectorControllerWrapper");
// option label
const curveLabel = document.createElement("div");
curveLabel.classList.add("candyDoc__inspectorChartOptionItemCurveLabel");
curveLabel.innerText = "curve";
const multiChoice=getMultiChoices(
  [
    {label:"Straight",value:"straight" },
    {label:"Step Line",value:"stepline" },
    {label:"Smooth",value:"smooth" },
  ],"Curve","straight"
)

curve.append(multiChoice);
multiChoice.addEventListener("mousedown", (e) => {
  
  
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    stroke:{
        ...options?.stroke??undefined,
        curve:e.target.dataset.value
    }
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
   multiChoice.querySelector(`[data-value='${options?.stroke?.curve}']`)?.classList?.add("candyDoc__multiChoiceSelected")

   filterChartOptions(selected)

})