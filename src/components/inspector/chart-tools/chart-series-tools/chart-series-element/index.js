import { getSelected } from "../../../../selection/index.js";
import { renderApexChart, renderChartData } from "../../render.js";
export const seriesElement = document.createElement("div");
seriesElement.classList.add("candyDoc__inspectorChartSeriesElement");

export const addValueIcon = document.createElement("div");
addValueIcon.classList.add(
  "candyDoc__inspectorChartAddValueIcon",
  "candyDoc__icon"
);
addValueIcon.innerHTML = /*html*/ `
<svg
  fill="var(--color)"
  height="15px"
  width="15px"
  version="1.1"
  id="XMLID_313_"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 24 24"
  xml:space="preserve"
  stroke="var(--color)"
  strokeWidth="0.00024000000000000003"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g id="add">
      <g>
        <polygon
          points="13,24 11,24 11,13 0,13 0,11 11,11 11,0 13,0 13,11 24,11 24,13 13,13 "
        ></polygon>
      </g>
    </g>
  </g>
</svg>
`;
const SeriesName = document.createElement("input");
SeriesName.placeholder = "Series Name. . .";
SeriesName.classList.add("candyDoc__inspectorChartSeriesName");
seriesElement.append(SeriesName)
export const removeSeriesElementIcon = document.createElement("div");
removeSeriesElementIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__InspectorChartSeriesElementRemoveIcon"
);
removeSeriesElementIcon.innerHTML =
  /*html*/
  `
  <svg
  width="15"
  height="15px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M17 12C17 11.4477 16.5523 11 16 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44771 13 8 13H16C16.5523 13 17 12.5523 17 12Z"
      fill="var(--color)"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>
`;

window.addEventListener("mousedown", (e) => {
  if (
    !e.target.classList.contains(
      "candyDoc__InspectorChartSeriesElementRemoveIcon"
    )
  )
    return;
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  if (options?.series?.length == 1) return;
  options.series.splice(parseInt(e.target.parentElement.dataset.index), 1);

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
  renderChartData();
});
seriesElement.append(removeSeriesElementIcon, addValueIcon);


window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__inspectorChartAddValueIcon"))
    return;
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  if (
    options.chart.type == "line" ||
    options.chart.type == "bar" ||
    options.chart.type == "column" ||
    options.chart.type == "area" ||
    options.chart.type == "treemap" ||
    options.chart.type == "heatmap"
  ) {
    options.series[e.target.parentElement.dataset.index].data.push({
      x: "new label",
      y: 10,
    });
  } else if (options.chart.type == "candlestick") {
    options.series[e.target.parentElement.dataset.index].data.push({
      x: "new label",
      y: [52.76, 57.35, 52.15, 57.03],
    });
  } else if (options.chart.type == "boxPlot") {
    options.series[e.target.parentElement.dataset.index].data.push({
      x: "new label",
      y: [52.76, 57.35, 52.15, 57.03, 67.98],
    });
  }
  else if (options.chart.type == "radar") {
    options.series[e.target.parentElement.dataset.index].data.push(10);
    options.labels.push("new label")
    
    
  }
  else {
    options.series.push(0);
    options.labels.push("new label");
  }

  renderApexChart(options)
  selected.dataset.chartOptions = JSON.stringify(options)
  renderChartData();
});
