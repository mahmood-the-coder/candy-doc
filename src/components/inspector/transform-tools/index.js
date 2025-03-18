import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected, getSelectedElements } from "../../selection/index.js";
import { rotate } from "./elements/rotate.js";
import { scale } from "./elements/scale.js";
import { skew } from "./elements/skew.js";
import { getTransform } from "./elements/transform.js";
import { translate } from "./elements/translate.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorTransformTools() {
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  const selectedElements = getSelectedElements();
  const selected=selectedElements[selectedElements.length-1]
  if (!selected) return;
  if (!selected?.querySelector) return;
  const target = selected.querySelector(".target");
  if (!target) return;
  if (!getCenterLayoutElement().contains(e.target)) return;

  const transform = getTransform(target);
  target.style.transform=transform.join(" ");
  translate.querySelectorAll("input").forEach((i,index)=>{
    i.value=transform[0][index]?.replace("px","")
  })
  scale.querySelectorAll("input").forEach((i,index)=>{
    i.value=transform[2][index];
  })
  
  rotate.querySelectorAll("input").forEach((i,index)=>{
    i.value=transform[1][index]?.replace("deg","");
  })

  skew.querySelectorAll("input").forEach((i,index)=>{
    i.value=transform[3][index]?.replace("deg","");
  })
});
