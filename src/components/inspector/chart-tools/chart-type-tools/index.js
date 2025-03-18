import { getSelected } from "../../../selection/index.js";
import { getInspector } from "../../index.js";
import { chartTypes } from "./elements/types.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorChartTypeTools() {
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if(getInspector().contains(e.target))return;
  const selected = getSelected();
  if (!selected) return;
 
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;

  const type = options.chart.type;

  chartTypes.querySelectorAll("option").forEach((op) => {
    if (op.value == type) {
      op.selected = "selected";
    } else {
      op.selected = "";
    }
  });

  
 
});
