import { calculateGradient, getColors } from "./calGradient.js";
import { gradientBar } from "./gradientBar.js";
import { getCurrentGradientType } from "./gradientType.js";
import { getCurrentDegree } from "./properties.js";
export function initDrag() {
  let deltaX = 0;
  let startX = 0;
  let isDragging;
  let target = null;
  let zoom = 1
  window.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("candyDoc__gradientColorLocation")) {
      isDragging = true;
      deltaX = 0;
      startX = e.target.offsetLeft;
      target = e.target;

      zoom = window.devicePixelRatio
    }
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX += e.movementX / zoom;
    let x = startX + deltaX;
    if (x < 0) {
      x = 0;
    }
    const maxX = target.parentElement.offsetWidth - target.offsetWidth;
    if (x > maxX) {
      x = maxX;
    }
    target.style.left = x + "px";
    gradientBar.style.backgroundImage = calculateGradient(
      getColors(),
      getCurrentGradientType(),
      getCurrentDegree()
    );
  });
  window.addEventListener("mouseup", () => {
    isDragging = false;
    target = null;
  });
}
