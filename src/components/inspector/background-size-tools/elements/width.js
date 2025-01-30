import { getSelected } from "../../../selection/index.js";
import { height } from "./height.js";
export const width = document.createElement("div");
width.classList.add("candyDoc__inspectorBackgroundSizeInput");
const widthController = document.createElement("input");
widthController.type = "number";
widthController.value = "100";
widthController.min = 1;
widthController.max = 100;
widthController.classList.add("candyDoc__inspectorBackgroundSizeInputController");
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorBackgroundSizeInputLabel");

label.innerText = "Width";

widthController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;

  selected.style.backgroundSize = `${e.target.value}% ${
    height.querySelector("input").value
  }%`;
});
width.append(label, widthController);
