import { getSelected } from "../../../selection/index.js";
import { getInspector } from "../../index.js";
import { renderApexChart } from "../render.js";
import { barHeight } from "./elements/barHeight.js";
import { borderRadius } from "./elements/borderRadius.js";
import { borderRadiusApplication } from "./elements/borderRadiusApplication.js";
import { columnWidth } from "./elements/columnWidth.js";
import { curve } from "./elements/curve.js";
import { dataLabels } from "./elements/dataLabels.js";
import { horizontal } from "./elements/horizontal.js";
import { isFunnel } from "./elements/isFunnel.js";
import { labelPosition } from "./elements/labelPosition.js";
import { lineDash } from "./elements/lineDash.js";
import { strokeWidth } from "./elements/strokeWidth.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorChartOptionsTools() {

  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if (getInspector().contains(e.target)) return;
  const selected = getSelected();
  if (!selected) return;


  renderChartPlotOptions(selected);

});

export function renderChartPlotOptions(selected) {
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options);
  filterChartOptions(selected);




}



export function filterChartOptions(selected) {
  [...wrapper.children].forEach(c => {
    if (c.dataset.chartType) {
      const types = c.dataset.chartType.split(" ");
    

      const exist = types.find(t => t == selected.dataset.chartType);
      if (exist) {
        c.style.display = "flex";

      }
      else {
        c.style.display = "none";
      }

    }

  }
  );
}

