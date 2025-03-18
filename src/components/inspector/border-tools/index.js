import { getCenterLayoutElement } from "../../layout/index.js";
import {  getSelectedElements } from "../../selection/index.js";
import { bottom } from "./elements/bottom.js";
import { left } from "./elements/left.js";
import { right } from "./elements/right.js";
import { top } from "./elements/top.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorBorderTools() {
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  const borderIcons={
    top:top,
    bottom:bottom,
    left:left,
    right:right,
  }
   
  if (!getCenterLayoutElement().contains(e.target)) return;
  const selectedElements=getSelectedElements();

  const selected = selectedElements[selectedElements.length-1]
  if (!selected) return;
  for(const value of Object.values(borderIcons))
  {
    value.classList.remove("candyDoc__activeIcon")
  }
  hasBorder(selected?.querySelector(".target")).sides.forEach(side=>{
    borderIcons[side].classList.add("candyDoc__activeIcon")
  })
 
});
function hasBorder(target) {
  if(!(target instanceof Element))return{ hasBorder: false, sides: [] }
  const computedStyle=getComputedStyle(target)
  const borderSides = ["top", "right", "bottom", "left"];
  const borders = [];

  borderSides.forEach((side) => {
      const borderWidth = computedStyle.getPropertyValue(`border-${side}-width`);
      const borderStyle = computedStyle.getPropertyValue(`border-${side}-style`);

      // Check if the border width is not "0px" and the style is not "none"
      if (borderWidth && borderWidth !== "0px" && borderStyle && borderStyle !== "none") {
          borders.push(side);
      }
  });

  if (borders.length > 0) {
      return { hasBorder: true, sides: borders };
  }
  return { hasBorder: false, sides: [] };
}
