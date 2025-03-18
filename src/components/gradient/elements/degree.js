import { calculateGradient, getColors } from "./calGradient.js";
import { setGradientBarGradient } from "./gradientBar.js";
import { getCurrentGradientType } from "./gradientType.js";
import { setCurrentDegree } from "./properties.js";
export const degree = document.createElement("div");
degree.classList.add("candyDoc__degreeInput");
export const degreeController = document.createElement("input");
degreeController.type = "number";
const label = document.createElement("div");
label.innerHTML = "&deg;";
label.classList.add("candyDoc__degreeLabel");
degreeController.min = 0;
degreeController.max = 360;
degreeController.value = "90";
degreeController.classList.add("candyDoc__degreeController");

degree.append(degreeController, label);

degreeController.addEventListener("input", (e) => {
  setGradientBarGradient(
    calculateGradient(getColors(), getCurrentGradientType(), e.target.value)
  );
 
  
  setCurrentDegree(e.target.value);
 
});
