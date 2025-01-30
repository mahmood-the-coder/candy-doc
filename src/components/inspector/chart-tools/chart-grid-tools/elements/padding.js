import { getSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { renderApexChart } from "../../render.js";
export const padding = document.createElement("div");
padding.classList.add("candyDoc__inspectorChartGridPadding");
const paddingLabel = document.createElement("div");
paddingLabel.innerText = "Padding";
paddingLabel.classList.add("candyDoc__inspectorChartGridPaddingLabel");

export const paddingItem = document.createElement("div");
paddingItem.classList.add("candyDoc__inspectorChartGridPaddingItem", "item");
const paddingController = document.createElement("input");
paddingController.type = "number";
paddingController.classList.add(
  "candyDoc__inspectorChartGridPaddingItemController",
  "controller"
);
const controllerLabel = document.createElement("div");
controllerLabel.classList.add(
  "candyDoc__inspectorChartGridPaddingItemControllerLabel",
  "controllerLabel"
);

paddingItem.append(paddingController, controllerLabel);

const left = paddingItem.cloneNode(true);
left.querySelector("input").dataset.property = "left";
left.dataset.value = "0";
left.querySelector(".controllerLabel").innerText = "Left";
const right = paddingItem.cloneNode(true);
right.querySelector("input").dataset.property = "right";
right.dataset.value = "0";
right.querySelector(".controllerLabel").innerText = "Right";
const top = paddingItem.cloneNode(true);
top.querySelector("input").dataset.property = "top";
top.dataset.value = "0";
top.querySelector(".controllerLabel").innerText = "Top";
const bottom = paddingItem.cloneNode(true);
bottom.querySelector("input").dataset.property = "bottom";
bottom.dataset.value = "0";
bottom.querySelector(".controllerLabel").innerText = "Bottom";

padding.append(paddingLabel, left, top, right, bottom);

padding.addEventListener("input", (e) => {
  e.target.dataset.value = e.target.value;
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    grid: {
      ...(options?.grid ?? undefined),
      padding: {
        ...(options?.grid?.padding ?? undefined),
        [e.target.dataset.property]: parseInt(e.target.dataset.value),
      },
    },
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});

window.addEventListener("mouseup", (e) => {
  if (getInspector().contains(e.target)) return;
  const selected = getSelected();
  if (!selected) return;

  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;

  padding.querySelector("[data-property='left']").value =
    options?.grid?.padding?.left ?? "0";
  padding.querySelector("[data-property='right']").value =
    options?.grid?.padding?.right ?? "0";
  padding.querySelector("[data-property='top']").value =
    options?.grid?.padding?.top ?? "0";
  padding.querySelector("[data-property='bottom']").value =
    options?.grid?.padding?.bottom ?? "0";
});
