import { getSelected } from "../../../selection/index.js";
export const strokeWidth = document.createElement("div");
strokeWidth.classList.add("candyDoc__inspectorDiagramStrokeWidth");
const strokeWidthController = document.createElement("input");
strokeWidthController.type = "range";
strokeWidthController.value = 1;
strokeWidthController.min=0;
strokeWidthController.max=100;
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorDiagramStrokeWidthLabel");

label.innerText = "Stroke Width";
strokeWidth.append(label, strokeWidthController);
strokeWidthController.addEventListener("input",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    selected.style.strokeWidth = e.target.value+"px";
    selected.parentElement.querySelector(`[data-arrow='${selected.dataset.line}']`).style.strokeWidth=e.target.value+"px"
  
})

window.addEventListener("mousedown",(e)=>{
    if(!e.target.classList.contains("candyDoc__diagramLine"))return;
    strokeWidth.querySelector("input").value=e.target.style?.strokeWidth?.replace("px","")??"1"

})