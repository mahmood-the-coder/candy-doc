import { getSelected } from "../../../selection/index.js";
export const strokeDasharray = document.createElement("div");
strokeDasharray.classList.add("candyDoc__inspectorDiagramStrokeDasharray");
const strokeDasharrayController = document.createElement("input");
strokeDasharrayController.type = "range";
strokeDasharrayController.value = 1;
strokeDasharrayController.min=0;
strokeDasharrayController.max=100;
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorDiagramStrokeDasharrayLabel");

label.innerText = "Stroke Dash Array";
strokeDasharray.append(label, strokeDasharrayController);
strokeDasharrayController.addEventListener("input",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    selected.style.strokeDasharray = e.target.value;
   
  
})

window.addEventListener("mousedown",(e)=>{
    if(!e.target.classList.contains("candyDoc__diagramLine"))return;
    strokeDasharray.querySelector("input").value=e.target.style?.strokeDasharray??"0"
      
})