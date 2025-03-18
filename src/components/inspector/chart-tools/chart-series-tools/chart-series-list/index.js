import { getSelected } from "../../../../selection/index.js";
import { renderColors } from "../../chart-colors-tool/index.js";
import { renderApexChart, renderChartData } from "../../render.js";
export const seriesList = document.createElement("div");
seriesList.classList.add("candyDoc__inspectorChartSeriesList");
export const addSeriesIcon = document.createElement("div");
addSeriesIcon.classList.add(
  "candyDoc__inspectorChartSeriesListAddIcon",
  "candyDoc__icon"
);
addSeriesIcon.innerHTML = /*html*/ `
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

window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__inspectorChartSeriesListAddIcon"))
    return;
  const selected = getSelected();
  if (!selected) return;

  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options.series.push([...options.series][options.series.length-1]);

  selected.dataset.chartOptions = JSON.stringify(options);

  renderApexChart(options)
  renderChartData();
  renderColors(selected)
});
