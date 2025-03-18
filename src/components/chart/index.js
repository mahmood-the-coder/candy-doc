const ApexCharts =require("apexcharts")
import { findAncestor } from "../find-ancestor/index.js";
import { insert } from "../insert/index.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBorderColorTools } from "../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../inspector/border-width-tools/index.js";
import { getInspectorChartColorTools } from "../inspector/chart-tools/chart-colors-tool/index.js";
import { getInspectorChartFillTools } from "../inspector/chart-tools/chart-fill-tools/index.js";
import { getInspectorChartGridTools } from "../inspector/chart-tools/chart-grid-tools/index.js";
import { getInspectorChartOptionsTools } from "../inspector/chart-tools/chart-options-tools/index.js";
import { getInspectorChartSeriesTools } from "../inspector/chart-tools/chart-series-tools/index.js";
import { getInspectorChartTitle } from "../inspector/chart-tools/chart-title-tools/index.js";
import { getInspectorChartTypeTools } from "../inspector/chart-tools/chart-type-tools/index.js";
import { getInspectorChartXAxisTools } from "../inspector/chart-tools/chart-xAxis-tools/index.js";
import { getInspectorChartYAxisTools } from "../inspector/chart-tools/chart-yAxis-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { chart } from "./elements/chart.js";
import { wrapper } from "./elements/wrapper.js";
export const charts = [];
export function insertChart() {
  const wrapperClone = wrapper.cloneNode(true);
  const chartClone = chart.cloneNode(true);
  wrapperClone.append(chartClone);
  let options = {
    colors: ["#83C5BE", "#FFDDD2"],
    labels: [],
    series: [
      {
        name: "Line",
        data: [
          { x: "A", y: 10 },
          { x: "B", y: 20 },
          { x: "C", y: 15 },
        ],
      },
    ],
    tooltip: {
      enabled: false,
    },
    chart: {
      animations: {
        enabled: false,
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 150
        },
        dynamicAnimation: {
          enabled: false,
          speed: 350
        }
      },
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },

      type: "line",
      width: "100%",
      height: "100%",
      background: "transparent",
    },
    dataLabels: {
      enabled: true,
      colors: ["#000000"]
    },
    stroke: {
      show: true,
      curve: "straight",
    },
    title: {
      text: "Chart Title",
      align: "center",
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
      column: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    title: {
      align: "center",
      text: "Chart Title",
      style: {
        color: "black",
        fontSize: "16px",
        fontWeight: "500"
      }
    }
  };
  wrapperClone.id = "chart__" + Date.now().toString(16);
  wrapperClone.dataset.chartType = "line";
  insert(wrapperClone);

  window.addEventListener("mousedown", (e) => {
    if (
      !e.target.classList.contains("candyDoc__chartWrapper") &&
      !findAncestor(e.target, "candyDoc__chartWrapper")
    ) return;

    addTools();

  });
  wrapperClone.dataset.chartOptions = JSON.stringify(options);
  const apex = new ApexCharts(chartClone, options);
  wrapperClone.dataset.chartId = apex.id = wrapperClone.id;
  apex.render().then(() => {
    charts.push(apex);
  });
}

function addTools() {
  const inspector = getInspector();
  const scrollTop = inspector.scrollTop;
  inspector.innerHTML = "";
  getInspector().append(
    getInspectorChartTitle(),
    getInspectorChartTypeTools(),
    getInspectorChartSeriesTools(),
    getInspectorChartOptionsTools(),
    getInspectorChartColorTools(),
    getInspectorChartGridTools(),
    getInspectorChartYAxisTools(),
    getInspectorChartXAxisTools(),
    getInspectorChartFillTools(),
    getInspectorTransformTools(),
    getAlignInspectorTools(),
    getInspectorBorderTools(),
    getInspectorBorderRadiusTools(),
    getInspectorBorderWidthTools(),
    getInspectorBorderColorTools(),
    getInspectorBorderImageTools()
  );

  inspector.scrollTop = scrollTop;
}

window.addEventListener("load", () => {
  window.addEventListener("mousedown", (e) => {
    if (
      !e.target.classList.contains("candyDoc__chartWrapper") &&
      !findAncestor(e.target, "candyDoc__chartWrapper")
    )
      return;
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    addTools();
    inspector.scrollTop = scrollTop;
  });
  charts.forEach(c => c?.destroy())
  getCenterLayoutElement()
    .querySelectorAll(".candyDoc__chart")
    .forEach((c) => {
      c.innerHTML = "";
      const options = JSON.parse(c.parentElement?.dataset?.chartOptions ?? "null")
      if (!options) return;
      const apex = new ApexCharts(c, options);
      apex.id = c.parentElement.id

      apex.render().then(() => {
        charts.push(apex);
      });
    });


});
