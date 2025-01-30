import { getSelected } from "../../../selection/index.js";
export const slice = document.createElement("div");
slice.classList.add("candyDoc__inspectorToolsWrapper");
const sliceLabel = document.createElement("div");
sliceLabel.classList.add("candyDoc__inspectorBorderSliceLabel");
sliceLabel.innerText = "Border Slice";
const sliceTop = document.createElement("div");
const sliceTopController = document.createElement("input");
sliceTopController.step=1
sliceTopController.classList.add(
  "candyDoc__inspectorBorderSliceController",
  "candyDoc__sliceControllerTop"
);
sliceTopController.value = "30";
sliceTopController.min = 0;

sliceTopController.type = "number";
const sliceTopLabel = document.createElement("div");
sliceTopLabel.innerText = "Slice Top";

sliceTop.append(sliceTopLabel, sliceTopController);

const sliceBottom = document.createElement("div");
const sliceBottomController = document.createElement("input");
sliceBottomController.step=1
sliceBottomController.value = "30";
sliceBottomController.classList.add(
  "candyDoc__inspectorBorderSliceController",
  "candyDoc__sliceControllerBottom"
);
sliceBottomController.min = 0;

sliceBottomController.type = "number";
const sliceBottomLabel = document.createElement("div");
sliceBottomLabel.innerText = "Slice Bottom";

sliceBottom.append(sliceBottomLabel, sliceBottomController);

const sliceLeft = document.createElement("div");
const sliceLeftController = document.createElement("input");
sliceLeftController.step=1
sliceLeftController.classList.add(
  "candyDoc__inspectorBorderSliceController",
  "candyDoc__sliceControllerLeft"
);
sliceLeftController.value = "30";
sliceLeftController.min = 0;

sliceLeftController.type = "number";
const sliceLeftLabel = document.createElement("div");
sliceLeftLabel.innerText = "Slice Left";

sliceLeft.append(sliceLeftLabel, sliceLeftController);

const sliceRight = document.createElement("div");
const sliceRightController = document.createElement("input");
sliceRightController.step=1
sliceRightController.classList.add(
  "candyDoc__inspectorBorderSliceController",
  "candyDoc__sliceControllerRight"
);
sliceRightController.value = "30";
sliceRightController.min = 0;

sliceRightController.type = "number";
const sliceRightLabel = document.createElement("div");
sliceRightLabel.innerText = "Slice Right";

sliceRight.append(sliceRightLabel, sliceRightController);

sliceTopController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageSlice = `${e.target.value} ${sliceRightController.value} ${sliceBottomController.value} ${sliceLeftController.value}`;

  document.querySelector(".candyDoc__inspectorSlicerTop").style.top =
  e.target.value + "px";
});
sliceRightController.addEventListener("input", (e) => {
  
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageSlice = `${sliceTopController.value} ${e.target.value} ${sliceBottomController.value} ${sliceLeftController.value}`;
 
  document.querySelector(".candyDoc__inspectorSlicerRight").style.right =
  e.target.value + "px";
});
sliceBottomController.addEventListener("input", (e) => {

  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageSlice = `${sliceTopController.value} ${sliceRightController.value} ${e.target.value} ${sliceLeftController.value}`;
 
  document.querySelector(".candyDoc__inspectorSlicerBottom").style.bottom =
    e.target.value + "px";
});

sliceLeftController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".target").style.borderImageSlice = `${sliceTopController.value} ${sliceRightController.value} ${sliceBottomController.value} ${e.target.value}`;
  
  document.querySelector(".candyDoc__inspectorSlicerLeft").style.left =
  e.target.value + "px";
});

slice.append(sliceLabel, sliceTop, sliceBottom, sliceLeft, sliceRight);
