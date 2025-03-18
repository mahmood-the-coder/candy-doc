import { getSelectedElements } from "../../../selection/index.js";
import { getTransform } from "./transform.js";

export const scale = document.createElement("div");
const scaleLabel = document.createElement("div");
scaleLabel.classList.add("candyDoc__inspectorScaleLabel");
scaleLabel.innerText = "Scale";
scale.classList.add("candyDoc__inspectorScale");
const scaleX = document.createElement("div");
scaleX.classList.add("candyDoc__inspectorScaleInput");
const scaleXController = document.createElement("input");
scaleXController.value = "1";
scaleXController.type = "number";
scaleXController.classList.add("candyDoc__inspectorScaleController");
const scaleXLabel = document.createElement("div");
scaleXLabel.innerText = "x";
scaleXLabel.classList.add("candyDoc__InspectorScaleControllerLabel");
scaleX.append(scaleXLabel, scaleXController);

const scaleY = document.createElement("div");
scaleY.classList.add("candyDoc__inspectorScaleInput");
const scaleYController = document.createElement("input");
scaleYController.value = "1";
scaleYController.type = "number";
scaleYController.classList.add("candyDoc__inspectorScaleController");
const scaleYLabel = document.createElement("div");
scaleYLabel.innerText = "y";
scaleYLabel.classList.add("candyDoc__InspectorScaleControllerLabel");
scaleY.append(scaleYLabel, scaleYController);

const scaleZ = document.createElement("div");
scaleZ.classList.add("candyDoc__inspectorScaleInput");
const scaleZController = document.createElement("input");
scaleZController.value = "1";
scaleZController.type = "number";
scaleZController.classList.add("candyDoc__inspectorScaleController");
const scaleZLabel = document.createElement("div");
scaleZLabel.innerText = "z";
scaleZLabel.classList.add("candyDoc__InspectorScaleControllerLabel");
scaleZ.append(scaleZLabel, scaleZController);

scale.append(scaleLabel, scaleX, scaleY, scaleZ);

scaleXController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();
  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    if (!selected) return;
    transform[2][0] = e.target.value;
    selected.querySelector(
      ".target"
    ).style.transform = `translate3d(${transform[0].join(
      ", "
    )}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(
      ", "
    )}) skew(${transform[3].join(", ")})`;
  })
});
scaleYController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();

  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[2][1] = e.target.value;
    selected.querySelector(
      ".target"
    ).style.transform = `translate3d(${transform[0].join(
      ", "
    )}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(
      ", "
    )}) skew(${transform[3].join(", ")})`;
  })
});
scaleZController.addEventListener("input", (e) => {
  const selectedElements = getSelectedElements();

  selectedElements.forEach(selected => {
    const transform = getTransform(selected.querySelector(".target"))
    transform[2][2] = e.target.value;
    selected.querySelector(
      ".target"
    ).style.transform = `translate3d(${transform[0].join(
      ", "
    )}) rotate3d(${transform[1].join(", ")}) scale3d(${transform[2].join(
      ", "
    )}) skew(${transform[3].join(", ")})`;
  })
});
scaleXController.step = 0.01;
scaleYController.step = 0.01;
scaleZController.step = 0.01;
