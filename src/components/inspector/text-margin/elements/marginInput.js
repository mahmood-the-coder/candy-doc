import { getSelected } from "../../../selection/index.js";
import { getMargin } from "./margin.js";

export const marginInput = document.createElement("div");
const marginLabel = document.createElement("div");
marginLabel.classList.add("candyDoc__inspectorMarginLabel");
marginLabel.innerText = "Margin";
marginInput.classList.add("candyDoc__inspectorMargin");
const marginX = document.createElement("div");
marginX.classList.add("candyDoc__inspectorMarginInput");
const marginXController = document.createElement("input");
marginXController.type = "number";
marginXController.value="0"
marginXController.classList.add("candyDoc__inspectorMarginController");
const marginXLabel = document.createElement("div");
marginXLabel.innerText = "bottom";
marginXLabel.classList.add("candyDoc__InspectorMarginControllerLabel");
marginX.append(marginXLabel, marginXController);

const marginY = document.createElement("div");
marginY.classList.add("candyDoc__inspectorMarginInput");
const marginYController = document.createElement("input");
marginYController.type = "number";
marginYController.value="0"
marginYController.classList.add("candyDoc__inspectorMarginController");
const marginYLabel = document.createElement("div");
marginYLabel.innerText = "top";
marginYLabel.classList.add("candyDoc__InspectorMarginControllerLabel");
marginY.append(marginYLabel, marginYController);



marginInput.append(marginLabel, marginX, marginY);

marginXController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
 
  selected.querySelector(".target").style.paddingBottom=e.target.value+"px"
 
});
marginYController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.marginTop=e.target.value+"px"

 
});
