import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected } from "../../selection/index.js";
import { getBackgroundImage } from "../background-image-tools/elements/backgroundImage.js";
import { createBackgroundRepeatList, list } from "./elements/backgroundRepeatList.js";
import { initDrag } from "./elements/drag.js";
import { getBackgroundRepeat, setBackgroundRepeatArray } from "./elements/getBackgroundRepeat.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorBackgroundRepeatTools() {
  initDrag(list)
  return wrapper;
}

window.addEventListener("mouseup",(e)=>{
  if(!getCenterLayoutElement().contains(e.target))return;
  const selected=getSelected();
  if(!selected)return;
  if(!selected.style)return;
  const backgroundRepeat=getBackgroundRepeat(selected).slice(0,getBackgroundImage(selected).length);
  createBackgroundRepeatList(backgroundRepeat);
  setBackgroundRepeatArray(backgroundRepeat)
  selected.style.backgroundRepeat=backgroundRepeat.join(", ")
})