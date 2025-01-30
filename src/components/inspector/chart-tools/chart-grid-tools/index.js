import { getSelected } from "../../../selection/index.js";
import { getInspector } from "../../index.js";
import { renderApexChart } from "../render.js";
import { addChartColColors } from "./elements/colColors.js";
import { gridColor } from "./elements/color.js";
import { initInspectorChartRowColorsDrag } from "./elements/drag.js";
import { addChartRowColors } from "./elements/rowColors.js";
import { wrapper } from "./elements/wrapper.js";
let isInit = false;
export function getInspectorChartGridTools() {
  if (!isInit) {
    initInspectorChartRowColorsDrag();

    isInit = true;
  }
  return wrapper;
}
window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (getInspector().contains(e.target)) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  if (!options?.grid?.row?.colors) {
    options = {
      ...options,
      grid: {
        ...(options?.grid ?? undefined),
        row: {
          ...(options?.grid?.row ?? undefined),
          colors: ["#ffffff", "#ffffff", "#ffffff"],
          opacity: 0.5,
        },
      },
    };
  }
  if (!options?.grid?.column?.colors) {
    options = {
      ...options,
      grid: {
        ...(options?.grid ?? undefined),
        column: {
          ...(options?.grid?.column ?? undefined),
          colors: ["#ffffff", "#ffffff", "#ffffff"],
          opacity: 0.5,
        },
      },
    };
  }

  gridColor.querySelector("input").value = options?.grid?.borderColor ?? "#ffffff";
  gridColor.querySelector("input").style.color =
    options?.grid?.borderColor ?? "#ffffff";
  gridColor.querySelector("input").style.backgroundColor =
    options?.grid?.borderColor ?? "#ffffff";
  selected.dataset.chartOptions = JSON.stringify(options);
  addChartRowColors(options.grid.row.colors);
  addChartColColors(options.grid.column.colors);
  renderApexChart(options)
});
