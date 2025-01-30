import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected } from "../../selection/index.js";
import { getBackgroundImage } from "../background-image-tools/elements/backgroundImage.js";
import { createBackgroundSizeList, list } from "./elements/backgroundSizeList.js";
import { initDrag } from "./elements/drag.js";
import { getBackgroundSize, setBackgroundSizeArray } from "./elements/getBackgroundSize.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorBackgroundSizeTools() {
  initDrag(list)
  return wrapper;
}
window.addEventListener("mouseup",(e)=>{
  if(!getCenterLayoutElement().contains(e.target))return;
  const selected=getSelected();
  if(!selected)return;
  if(!selected.style)return;
  const backgroundSize=getBackgroundSize(selected).slice(0,getBackgroundImage(selected).length);
  createBackgroundSizeList(backgroundSize);
  setBackgroundSizeArray(backgroundSize)
  
})