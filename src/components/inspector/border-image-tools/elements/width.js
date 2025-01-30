import { getSelected } from "../../../selection/index.js";

export const width = document.createElement("div");
width.classList.add("candyDoc__inspectorToolsWrapper");
const widthLabel = document.createElement("div");
widthLabel.classList.add("candyDoc__inspectorImageBorderWidthLabel");
widthLabel.innerText = "Border Width";
const widthTop = document.createElement("div");
const widthVerticalController = document.createElement("input");
widthVerticalController.classList.add(
  "candyDoc__inspectorImageBorderWidthController"
);
widthVerticalController.value = "20";
widthVerticalController.min = 0;
widthVerticalController.max = 100;
widthVerticalController.type = "number";
const widthTopLabel = document.createElement("div");
widthTopLabel.innerText = "Width Vertical";

widthTop.append(widthTopLabel, widthVerticalController);


const widthHorizontal = document.createElement("div");
const widthHorizontalController = document.createElement("input");
widthHorizontalController.classList.add(
  "candyDoc__inspectorImageBorderWidthController"
);
widthHorizontalController.value = "25";
widthHorizontalController.min = 0;
widthHorizontalController.max = 100;
widthHorizontalController.type = "number";
const widthLeftLabel = document.createElement("div");
widthLeftLabel.innerText = "Width Horizontal";

widthHorizontal.append(widthLeftLabel, widthHorizontalController);


widthVerticalController.addEventListener("input", (e) => {
  
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageWidth = `${e.target.value}px ${widthHorizontalController.value}px`;
 
  
});


widthHorizontalController.addEventListener("input", (e) => {
  
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageWidth =  `${widthVerticalController.value}px ${e.target.value}px`;
  
});

width.append(widthLabel, widthTop, widthHorizontal);

