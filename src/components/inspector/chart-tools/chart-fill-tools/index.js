import { getSelected } from "../../../selection/index.js";
import { initInspectorChartFillColorsDrag } from "./elements/drag.js";
import { wrapper } from "./elements/wrapper.js";
let isInit=false;
export function getInspectorChartFillTools() {
    if(!isInit)
    {
        initInspectorChartFillColorsDrag()
        isInit=true;
    }
  return wrapper;
}

window.addEventListener("mouseup",(e)=>{
  const selected=getSelected();
  if(!selected)return;
  
})