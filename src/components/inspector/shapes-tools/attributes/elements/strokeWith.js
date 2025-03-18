import { getSelected } from "../../../../selection/index.js";
export const strokeWidth = document.createElement("div");
strokeWidth.classList.add("candyDoc__inspectorStrokeWidth");
const strokeWidthController = document.createElement("input");
strokeWidthController.type = "range";
strokeWidthController.value = 1;
strokeWidthController.min=0;
strokeWidthController.max=100;
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorStrokeWidthLabel");

label.innerText = "Stroke Width";
strokeWidth.append(label, strokeWidthController);
strokeWidthController.addEventListener("input",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    selected.style.strokeWidth = e.target.value+"px";
})

