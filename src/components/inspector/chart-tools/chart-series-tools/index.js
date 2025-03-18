import { getCenterLayoutElement } from "../../../layout/index.js";
import { renderChartData } from "../render.js";
import { initInspectorChartDrag } from "./elements/drag.js";
import { wrapper } from "./elements/wrapper.js";
let isInit = false;
export function getInspectorChartSeriesTools() {
  if (!isInit) {
    initInspectorChartDrag();
    
    isInit = true;
  }
  renderChartData()
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if(!getCenterLayoutElement().contains(e.target))return;
  renderChartData()
});
