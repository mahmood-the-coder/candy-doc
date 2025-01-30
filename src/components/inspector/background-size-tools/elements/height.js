import { getSelected } from "../../../selection/index.js";
import { width } from "./width.js";
export const height = document.createElement("div");
height.classList.add("candyDoc__inspectorBackgroundSizeInput");
const heightController = document.createElement("input");
heightController.classList.add("candyDoc__inspectorBackgroundSizeInputController");
heightController.value = "100";
heightController.min = 1;
heightController.max = 100;
const label = document.createElement("div");
label.classList.add("candyDoc__inspectorBackgroundSizeInputLabel");
heightController.type = "number";
label.innerText = "Height";

heightController.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;

  selected.style.backgroundSize = `${width.querySelector("input").value}% ${
    e.target.value
  }%`;
});

height.append(label, heightController);
