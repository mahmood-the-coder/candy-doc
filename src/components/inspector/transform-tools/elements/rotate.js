import { getSelectedElements } from "../../../selection/index.js";
import { getTransform } from "./transform.js";


export const rotate = document.createElement("div");
const rotateLabel = document.createElement("div");
rotateLabel.classList.add("candyDoc__inspectorRotateLabel");
rotateLabel.innerText = "Rotate";
rotate.classList.add("candyDoc__inspectorRotate");
const rotateX = document.createElement("div");
rotateX.classList.add("candyDoc__inspectorRotateInput");
const rotateXController = document.createElement("input");
rotateXController.type = "number";
rotateXController.min = -1;
rotateXController.max = 1;
rotateXController.value = "0"
rotateXController.classList.add("candyDoc__inspectorRotateController");
const rotateXLabel = document.createElement("div");
rotateXLabel.innerText = "x";
rotateXLabel.classList.add("candyDoc__InspectorRotateControllerLabel");
rotateX.append(rotateXLabel, rotateXController);

const rotateY = document.createElement("div");
rotateY.classList.add("candyDoc__inspectorRotateInput");
const rotateYController = document.createElement("input");
rotateYController.min = -1;
rotateYController.max = 1;
rotateYController.type = "number";
rotateYController.value = "1"
rotateYController.classList.add("candyDoc__inspectorRotateController");
const rotateYLabel = document.createElement("div");
rotateYLabel.innerText = "y";
rotateYLabel.classList.add("candyDoc__InspectorRotateControllerLabel");
rotateY.append(rotateYLabel, rotateYController);

const rotateZ = document.createElement("div");
rotateZ.classList.add("candyDoc__inspectorRotateInput");
const rotateZController = document.createElement("input");
rotateZController.min = -1;
rotateZController.max = 1;
rotateZController.type = "number";
rotateZController.value = "0"
rotateZController.classList.add("candyDoc__inspectorRotateController");
const rotateZLabel = document.createElement("div");
rotateZLabel.innerText = "z";
rotateZLabel.classList.add("candyDoc__InspectorRotateControllerLabel");
rotateZ.append(rotateZLabel, rotateZController);

const rotateAmount = document.createElement("div");
rotateAmount.classList.add("candyDoc__inspectorRotateInput");
const rotateAmountController = document.createElement("input");
rotateAmountController.type = "number";
rotateAmountController.value = "0"
rotateAmountController.classList.add("candyDoc__inspectorRotateController");
const rotateAmountLabel = document.createElement("div");
rotateAmountLabel.innerText = "amount";
rotateAmountLabel.classList.add("candyDoc__InspectorRotateControllerLabel");
rotateAmount.append(rotateAmountLabel, rotateAmountController);

rotate.append(rotateLabel, rotateX, rotateY, rotateZ, rotateAmount);

rotateXController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements()

  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[1][0] = e.target.value;
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
rotateYController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements()
  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[1][1] = e.target.value;
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
rotateZController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements()

  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[1][2] = e.target.value;
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
rotateAmountController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements()
  
  selectedElements.forEach(selected=>{
    const transform = getTransform(selected.querySelector(".target"))
  transform[1][3] = e.target.value + "deg";
  selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
