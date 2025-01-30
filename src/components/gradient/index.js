import { getInspector } from "../inspector/index.js";
import { calculateGradient, getColors } from "./elements/calGradient.js";
import { initDrag } from "./elements/drag.js";
import { getCurrentGradientType } from "./elements/gradientType.js";
import { getCurrentDegree } from "./elements/properties.js";
import { wrapper } from "./elements/wrapper.js";
let isInitialized = false;
let currentAction = null;
export function openGradient(action) {
  if (!isInitialized) {
    initDrag();

    isInitialized = true;
    window.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("candyDoc__gradientWrapper")) return;
      if (wrapper.contains(e.target)) return;
      if (getInspector().contains(e.target)) return;
      closeGradient();
    });
  }
  currentAction = action;
 
  
  wrapper.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("candyDoc__gradientApply"))
      currentAction(getGradientValue());
  });

  document.body.append(wrapper);
}

export function closeGradient() {
  wrapper?.remove();
  currentAction=null;
}
export function getGradientValue() {
  return calculateGradient(
    getColors(),
    getCurrentGradientType(),
    getCurrentDegree()
  );
}
