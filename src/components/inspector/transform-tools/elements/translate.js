import { getSelectedElements } from "../../../selection/index.js";
import { getTransform } from "./transform.js";

export const translate = document.createElement("div");
const translateLabel = document.createElement("div");
translateLabel.classList.add("candyDoc__inspectorTranslateLabel");
translateLabel.innerText = "Translate";
translate.classList.add("candyDoc__inspectorTranslate");
const translateX = document.createElement("div");
translateX.classList.add("candyDoc__inspectorTranslateInput");
const translateXController = document.createElement("input");
translateXController.type = "number";
translateXController.value = "0";
translateXController.classList.add("candyDoc__inspectorTranslateController");
const translateXLabel = document.createElement("div");
translateXLabel.innerText = "x";
translateXLabel.classList.add("candyDoc__InspectorTranslateControllerLabel");
translateX.append(translateXLabel, translateXController);

const translateY = document.createElement("div");
translateY.classList.add("candyDoc__inspectorTranslateInput");
const translateYController = document.createElement("input");
translateYController.type = "number";
translateYController.value = "0";
translateYController.classList.add("candyDoc__inspectorTranslateController");
const translateYLabel = document.createElement("div");
translateYLabel.innerText = "y";
translateYLabel.classList.add("candyDoc__InspectorTranslateControllerLabel");
translateY.append(translateYLabel, translateYController);

const translateZ = document.createElement("div");
translateZ.classList.add("candyDoc__inspectorTranslateInput");
const translateZController = document.createElement("input");
translateZController.type = "number";
translateZController.value = "0";
translateZController.classList.add("candyDoc__inspectorTranslateController");
const translateZLabel = document.createElement("div");
translateZLabel.innerText = "z";
translateZLabel.classList.add("candyDoc__InspectorTranslateControllerLabel");
translateZ.append(translateZLabel, translateZController);

translate.append(translateLabel, translateX, translateY, translateZ);

translateXController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected=>{
    const transform=getTransform(selected.querySelector(".target"))
    transform[0][0] = e.target.value+"px";
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
translateYController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected=>{
    const transform=getTransform(selected.querySelector(".target"))
  transform[0][1] = e.target.value+"px";
  selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
translateZController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected=>{
    const transform=getTransform(selected.querySelector(".target"))
    transform[0][2] = e.target.value+"px";
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
