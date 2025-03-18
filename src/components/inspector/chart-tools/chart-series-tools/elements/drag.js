import { getSelected } from "../../../../selection/index.js";
import { renderApexChart, renderChartData } from "../../render.js";
import { seriesList } from "../chart-series-list/index.js";
import { swap } from "./swap.js";
export function initInspectorChartDrag() {
  let isDragging = false;
  let startY = 0;
  let deltaY = 0;
  let target = null;
  let clone = null;
  let container = null;
  let zoom=1
  window.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("candyDoc__inspectorChartDragIcon")) {
      target = e.target.parentElement;
      zoom=window.devicePixelRatio
      container = target.parentElement;

      isDragging = true;
      startY = target.offsetTop + e.offsetY;

      deltaY = 0;
      target.classList.add("dragging");
      clone = target.cloneNode();

      clone.style.height = "5px";
      clone.style.padding = "0";
      clone.style.width = target.offsetWidth + "px";
      clone.style.backgroundColor = "var(--color)";
      clone.style.opacity = "0.5";
      clone.style.top = startY + "px";
      clone.style.position = "absolute";
      clone.style.zIndex = "100";
      clone.style.cursor = "row-resize";
      clone.className = "";
      target.style.opacity = "0";
      container.append(clone);
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    deltaY += e.movementY/zoom;
    let y = startY + deltaY;
    const minY = 0;
    const maxY = container.offsetHeight - clone.offsetHeight;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    clone.style.top = y + "px";
    swap(
      clone,
      target,
      [...container.querySelectorAll(".candyDoc__inspectorChartItem")].filter(
        (c) => !c.classList.contains("dragging")
      )
    );
  });
  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    const selected = getSelected();
    if (selected) {
    
    
      
      const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
     
      if (!options) return;

      
      if("donut radialBar".includes(options.chart.type))
      {
        
        const sortedData = [
          ...seriesList
            .querySelectorAll(
              ".candyDoc__inspectorChartItem"
            ),
        ].map((element, index) => {
          return options.series[element.dataset.index]=parseFloat(element.dataset.value);
        });
        const sortedLabels = [
          ...seriesList
            .querySelectorAll(
              ".candyDoc__inspectorChartItem"
            ),
        ].map((element, index) => {
          return options.labels[element.dataset.index]=element.dataset.label;
        });
        options.series = sortedData;
        options.labels=sortedLabels
      }
      else {
    
     
        const sorted = [
          ...seriesList
            .querySelectorAll(".candyDoc__inspectorChartSeriesElement")
            [container.dataset.index].querySelectorAll(
              ".candyDoc__inspectorChartItem"
            ),
        ].map((element, index) => {
          return options.series[container.dataset.index].data[
            element.dataset.index
          ];
        });
        options.series[container.dataset.index].data = sorted;
        
      }
     
      selected.dataset.chartOptions = JSON.stringify(options);
      renderApexChart(options)
      renderChartData();
      
    }
    isDragging = false;
    target?.classList.remove("dragging");
    target.style.opacity = "1";
    target = null;
    clone.remove();
  });
}
