import { createColorInput } from "../../../editor-UI/color/index.js";
import { getSelected } from "../../../selection/index.js";
export const stroke = document.createElement("div");
stroke.classList.add("candyDoc__inspectorDiagramStroke");
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorDiagramStrokeLabel");
label.innerText = "Stroke";
const colorInput = createColorInput();
stroke.append(label, colorInput);

colorInput.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.style.stroke = e.target.value;
  selected.parentElement.querySelector(`[data-arrow='${selected.dataset.line}']`).style.stroke=e.target.value
  selected.parentElement.querySelector(`[data-arrow='${selected.dataset.line}']`).style.fill=e.target.value
});


window.addEventListener("mousedown",(e)=>{
  
    if(!e.target.classList.contains("candyDoc__diagramLine"))return;
    stroke.querySelector("input").value=e.target?.style?.stroke
    stroke.querySelector("input").style.backgroundColor=stroke.querySelector("input").value
    stroke.querySelector("input").style.color=stroke.querySelector("input").value
    
})