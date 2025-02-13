import { getSelectedElements } from "../../../selection/index.js";
import { getTransform } from "./transform.js";

export const skew = document.createElement("div");
const skewLabel = document.createElement("div");
skewLabel.classList.add("candyDoc__inspectorSkewLabel");
skewLabel.innerText = "Skew";
skew.classList.add("candyDoc__inspectorSkew");
const skewX = document.createElement("div");
skewX.classList.add("candyDoc__inspectorSkewInput");
const skewXController = document.createElement("input");
skewXController.type = "number";
skewXController.value = "0"
skewXController.classList.add("candyDoc__inspectorSkewController");
const skewXLabel = document.createElement("div");
skewXLabel.innerText = "x";
skewXLabel.classList.add("candyDoc__InspectorSkewControllerLabel");
skewX.append(skewXLabel, skewXController);

const skewY = document.createElement("div");
skewY.classList.add("candyDoc__inspectorSkewInput");
const skewYController = document.createElement("input");
skewYController.type = "number";
skewYController.value = "0"
skewYController.classList.add("candyDoc__inspectorSkewController");
const skewYLabel = document.createElement("div");
skewYLabel.innerText = "y";
skewYLabel.classList.add("candyDoc__InspectorSkewControllerLabel");
skewY.append(skewYLabel, skewYController);



skew.append(skewLabel, skewX, skewY);

skewXController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();

  selectedElements.foreEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[3][0] = e.target.value + "deg";
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
skewYController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.foreEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[3][1] = e.target.value + "deg";
    selected.querySelector(".target").style.transform = `translate3d(${transform[0].join(", ")}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(", ")}) skew(${transform[3].join(", ")})`;
  })
});
