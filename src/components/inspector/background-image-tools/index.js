import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected } from "../../selection/index.js";
import {
  getBackgroundImage,
  setBackgroundImageArray
} from "./elements/backgroundImage.js";
import { createBackgroundList } from "./elements/backgroundList.js";
import { initDrag } from "./elements/drag.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorBackgroundTools() {
  initDrag(wrapper);
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if (!getCenterLayoutElement().contains(e.target)) return;
  const selected = getSelected();
  if (!selected) return;
   
   
  const backgroundImage=getBackgroundImage(selected);
  
  
  
  setBackgroundImageArray(backgroundImage);
  createBackgroundList(backgroundImage);
});
