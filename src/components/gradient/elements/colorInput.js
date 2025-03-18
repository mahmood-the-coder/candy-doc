import { createColorInput } from "../../editor-UI/color/index.js";
import { calculateGradient, getColors } from "./calGradient.js";
import { gradientBar } from "./gradientBar.js";
import {
  getCurrentGradientType
} from "./gradientType.js";
import {
  getCurrentColor, getCurrentColorLocation, getCurrentDegree,
  setCurrentColor
} from "./properties.js";

// color input
export const colorController = createColorInput();
colorController.type = "text";
colorController.classList.add("candyDoc__gradientColorController")
colorController.addEventListener("input", (e) => {
  setCurrentColor(e.target.value);
  getCurrentColorLocation().style.backgroundColor = getCurrentColor();
  getCurrentColorLocation().dataset.hexColor=getCurrentColor();

  gradientBar.style.backgroundImage = calculateGradient(
    getColors(),
    getCurrentGradientType(),
    getCurrentDegree()
  );
  
});


export function getColorInputController() {
  return colorController;
}


