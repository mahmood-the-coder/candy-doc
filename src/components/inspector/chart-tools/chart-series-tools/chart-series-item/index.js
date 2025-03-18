import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const ValueItem = document.createElement("div");

ValueItem.classList.add("candyDoc__inspectorChartItem");
const ItemDragIcon = document.createElement("div");
ItemDragIcon.classList.add(
  "candyDoc__inspectorChartDragIcon",
  "candyDoc__icon"
);
ItemDragIcon.innerHTML = /*html*/ `
<svg
  width="15px"
  height="15px"
  viewBox="0 0 24.00 24.00"
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
    <g id="Interface / Drag_Vertical">
      <g id="Vector">
        <path
          d="M14 18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17C14.4477 17 14 17.4477 14 18Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14 6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5C14.4477 5 14 5.44772 14 6Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </g>
  </g>
</svg>
`;

const ItemRemoveIcon = document.createElement("div");
ItemRemoveIcon.classList.add(
  "candyDoc__inspectorChartItemRemoveIcon",
  "candyDoc__icon"
);
ItemRemoveIcon.innerHTML = /*html*/ `
<svg
  width="64px"
  height="64px"
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
      d="M7 12L17 12"
      stroke="var(--color)"
      strokeWidth="1.392"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="var(--color)"
      strokeWidth="1.392"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></circle>
  </g>
</svg>

`;

ValueItem.append(ItemDragIcon, ItemRemoveIcon);
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__inspectorChartItemRemoveIcon"))
    return;
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions || "null");

  if (!options) return;


  if (
    options.chart.type=="line" ||
    options.chart.type=="column" ||
    options.chart.type=="bar" ||
    options.chart.type=="radar" ||
    options.chart.type=="area" ||
    options.chart.type=="heatmap" ||
    options.chart.type=="treemap" ||
    options.chart.type=="candlestick" ||
    options.chart.type=="boxPlot" 
    
  )
  {
    if(options.series[e.target.parentElement.parentElement.dataset.index].data.length==1)return;
    options.series[e.target.parentElement.parentElement.dataset.index].data.splice(parseInt(e.target.parentElement.dataset.index), 1);
    
  }
  else
  {
    if(options.labels.length==1)return;
    options.series.splice(parseInt(e.target.parentElement.dataset.index), 1);
    options.labels.splice(parseInt(e.target.parentElement.dataset.index), 1);
  }

  
  renderApexChart(options)
  e.target?.parentElement?.remove();
});
