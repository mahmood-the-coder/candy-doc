import { createColorInput } from "../../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../../selection/index.js";
import { renderApexChart } from "../../../render.js";
export const barBackgroundColor = document.createElement("div");
barBackgroundColor.classList.add("candyDoc__inspectorChartOptionsColors","barBackground");
const colorItem = document.createElement("div");
colorItem.classList.add(
  "candyDoc__inspectorChartOptionsColorsItem",
  "candyDoc__inspectorChartBackgroundBarColorDragItem"
);
const colorItemController = createColorInput()
colorItemController.type = "text";
colorItemController.classList.add(
  "candyDoc__inspectorChartOptionsColorsItemController"
);
const colorsLabel = document.createElement("div");
colorsLabel.innerText = "Background Color(s)";
colorsLabel.classList.add("candyDoc__inspectorChartOptionsColorsLabel");
colorItem.type = "color";
barBackgroundColor.dataset.chartType = "bar";

const removeIcon = document.createElement("div");
removeIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__inspectorChartOptionsColorsItemRemoveIcon",
  "removeIcon"
);
removeIcon.innerHTML =
  /*html*/
  `
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

const dragIcon = document.createElement("div");
dragIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__inspectorChartBackgroundBarColorDragIcon",
  "dragIcon"
);
dragIcon.innerHTML =
  /*html*/
  `<svg
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
const addIcon = document.createElement("div");
addIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__inspectorChartOptionsColorItemAddIcon"
);
addIcon.innerHTML =
  /*html*/
  `
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

colorItem.append(removeIcon, dragIcon, colorItemController);
addIcon.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  const lastColor = options.plotOptions.bar.colors.backgroundBarColors[options.plotOptions.bar.colors.backgroundBarColors.length - 1];
  options.plotOptions.bar.colors.backgroundBarColors.push(lastColor);
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
  addChartBarBackgroundColors(options.plotOptions.bar.colors.backgroundBarColors);
});
export function addChartBarBackgroundColors(colorsArray) {
 
  barBackgroundColor.innerHTML = "";
  barBackgroundColor.append(colorsLabel);

 barBackgroundColor.append(addIcon);
  for (let index = 0; index < colorsArray.length; index++) {
   
    const color = colorsArray[index];
    const colorItemClone = colorItem.cloneNode(true);

    colorItemClone.dataset.index = index;
    const input = colorItemClone.querySelector("input");
    input.value = color;
    input.style.color = color;
    input.style.backgroundColor = color;
    input.addEventListener("input", (e) => {
      const selected = getSelected();
      if (!selected) return;
      const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
      if (!options) return;
      options.plotOptions.bar.colors.backgroundBarColors[e.target.parentElement.dataset.index] = e.target.value;
      selected.dataset.chartOptions = JSON.stringify(options);
    
      input.style.color = color;
      input.style.backgroundColor = color;
      renderApexChart(options)
    });
    barBackgroundColor.append(colorItemClone);

    colorItemClone
      .querySelector(".removeIcon")
      .addEventListener("mousedown", (e) => {
        const index = e.target.parentElement.dataset.index;

        const selected = getSelected();
        if (!selected) return;
        const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
        if (!options) return;
        if (options.plotOptions.bar.colors.backgroundBarColors.length <= 1) return;
        options.plotOptions.bar.colors.backgroundBarColors.splice(parseInt(index), 1);
        selected.dataset.chartOptions = JSON.stringify(options);
        renderApexChart(options)

        e.target.parentElement?.remove();
        if (options.plotOptions.bar.colors.backgroundBarColors.length <= 1) {
          barBackgroundColor.querySelector(".removeIcon")?.remove();
          barBackgroundColor.querySelector(".dragIcon")?.remove();
        }
      });
  }
  if (colorsArray.length <= 1) {
    barBackgroundColor.querySelector(".removeIcon")?.remove();
    barBackgroundColor.querySelector(".dragIcon")?.remove();
  }
}

