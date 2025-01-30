import { getSelected } from "../../../../selection/index.js";
export const strokeDashArray = document.createElement("div");
strokeDashArray.classList.add("candyDoc__inspectorStrokeDashArray");
const strokeDashArrayController = document.createElement("input");
strokeDashArrayController.type = "range";
strokeDashArrayController.value = 0;
strokeDashArrayController.min=0;
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorStrokeDashArrayLabel");

label.innerText = "Stroke Dash";
strokeDashArray.append(label, strokeDashArrayController);
strokeDashArrayController.addEventListener("input",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    selected.style.strokeDasharray = e.target.value;
})
