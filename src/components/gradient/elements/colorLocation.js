import { calculateGradient, getColors } from "./calGradient.js";
import { getColorInputController } from "./colorInput.js";
import { gradientBar, setGradientBarGradient } from "./gradientBar.js";
import { getCurrentDegree, setCurrentColorLocation } from "./properties.js";
export const colorLocation = document.createElement("div");
colorLocation.classList.add("candyDoc__gradientColorLocation");
colorLocation.draggable = false;

export function createColorLocation() {
  const clone = colorLocation.cloneNode(true);
  clone.addEventListener("dragstart", (e) => e.preventDefault());
  clone.addEventListener("contextmenu", () => {
    clone?.remove();
    setGradientBarGradient(
      calculateGradient(
        getColors(),
        getCurrentGradientType(),
        getCurrentDegree()
      )
    );
    
    gradientBar
      .querySelectorAll(".candyDoc__gradientColorLocation")
      .forEach((l, index) => {
        l.innerText = (index + 1).toString();
      });
  });
  clone.addEventListener("mousedown", (e) => {
  
    setCurrentColorLocation(e.target);
    getColorInputController().value = e.target?.dataset?.hexColor ?? "#0064DD"
  
    
  });
  return clone;
}
