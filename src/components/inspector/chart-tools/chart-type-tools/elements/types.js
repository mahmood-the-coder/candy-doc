import { getSelected, setSelected } from "../../../../selection/index.js";
import { getInspector } from "../../../index.js";
import { renderColors } from "../../chart-colors-tool/index.js";
import { renderChartPlotOptions } from "../../chart-options-tools/index.js";
import { resetChartTitle } from "../../chart-title-tools/index.js";
import { renderApexChart, renderChartData } from "../../render.js";
import { area, areaOptions } from "./area.js";
import { bar, barOptions } from "./bar.js";
import { boxPlot, boxPlotOptions } from "./boxPlot.js";
import { candlestick, candlestickOptions } from "./candlestick.js";
import { donut, donutOptions } from "./donut.js";
import { heatmap, heatmapOptions } from "./heatmap.js";
import { line, lineOptions } from "./line.js";
import { radar, radarOptions } from "./radar.js";
import { radial, radialOptions } from "./radial.js";
import { rangeArea, rangeAreaOptions } from "./rangeArea.js";
import { rangeBar, rangeBarOptions } from "./rangeBar.js";
import { treemap, treemapOptions } from "./treemap.js";
export const chartTypes = document.createElement("div")
const select = document.createElement("select");

chartTypes.classList.add("candyDoc__inspectorChartType");
chartTypes.append(select)
select.append(
  line,
  area,
  bar,
  boxPlot,
  candlestick,
  rangeBar,
  rangeArea,
  heatmap,
  treemap,
  donut,
  radar,
  radial
);
select.addEventListener("change", (e) => {
  let options = null;
  const inspector = getInspector();

  [...inspector.children].forEach((c) => (c.style.display = "flex"));
  if (e.target.value == "line") {
    options = lineOptions;
  } else if (e.target.value == "area") {
    options = areaOptions;
  } else if (e.target.value == "rangeArea") {
    options = rangeAreaOptions;
  } else if (e.target.value == "rangeBar") {
    options = rangeBarOptions;
  } else if (e.target.value == "bar") {
    options = barOptions;
  } else if (e.target.value == "boxPlot") {
    options = boxPlotOptions;
  } else if (e.target.value == "candlestick") {
    options = candlestickOptions;
  } else if (e.target.value == "heatmap") {
    options = heatmapOptions;

    inspector.querySelector(".chartXAxis").style.display = "none";
    inspector.querySelector(".chartYAxis").style.display = "none";
    inspector.querySelector(".chartGrid").style.display = "none";
  } else if (e.target.value == "treemap") {
    options = treemapOptions;
    inspector.querySelector(".chartXAxis").style.display = "none";
    inspector.querySelector(".chartYAxis").style.display = "none";
    inspector.querySelector(".chartGrid").style.display = "none";
  } else if (e.target.value == "donut") {
    options = donutOptions;
    inspector.querySelector(".chartXAxis").style.display = "none";
    inspector.querySelector(".chartYAxis").style.display = "none";
    inspector.querySelector(".chartGrid").style.display = "none";
  } else if (e.target.value == "radar") {
    options = radarOptions;
    inspector.querySelector(".chartXAxis").style.display = "none";
    inspector.querySelector(".chartYAxis").style.display = "none";
    inspector.querySelector(".chartGrid").style.display = "none";
  } else if (e.target.value == "radialBar") {
    options = radialOptions;
    inspector.querySelector(".chartXAxis").style.display = "none";
    inspector.querySelector(".chartYAxis").style.display = "none";
    inspector.querySelector(".chartGrid").style.display = "none";
  }
  if (options) {

    const selected = getSelected();
    selected.dataset.chartOptions = JSON.stringify(options);
    selected.dataset.chartType=options.chart.type
    renderChartPlotOptions(selected);
    setSelected(selected);
    renderChartData();
    renderApexChart(options)
    resetChartTitle();
    renderColors(selected)
  }
});
