import { createColorInput } from "../../../../../editor-UI/color/index.js";
import { getSelected } from "../../../../../selection/index.js";
import { getInspector } from "../../../../index.js";
import { renderApexChart } from "../../../render.js";
export const boxPlotColors = document.createElement("div");
boxPlotColors.classList.add("candyDoc__inspectorChartOptionsBoxPlotColors","boxPlot");
const colorItem = document.createElement("div");
colorItem.classList.add(
  "candyDoc__inspectorChartOptionsBoxPlotColorsItem",
  "candyDoc__inspectorChartColorDragItem"
);
const colorItemController = createColorInput();
colorItemController.type = "text";
colorItemController.classList.add(
  "candyDoc__inspectorChartOptionsBoxPlotColorsItemController"
);
const boxPlotColorsLabel = document.createElement("div");
boxPlotColorsLabel.innerText = "Color(s)";
boxPlotColorsLabel.classList.add(
  "candyDoc__inspectorChartOptionsBoxPlotColorsLabel"
);
colorItem.type = "color";
boxPlotColors.dataset.chartType =
  "boxPlot";



colorItem.append(colorItemController);
export function addChartBoxPlotColors() {
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  if(!options?.plotOptions[selected.dataset.chartType])return;
  const boxPlotColors = getInspector().querySelector(
    ".candyDoc__inspectorChartOptionsBoxPlotColors"
  );
  boxPlotColors.innerHTML = "";
  boxPlotColors.append(boxPlotColorsLabel);

  const upperColor = colorItem.cloneNode(true);
  upperColor.querySelector("input").value =
    options?.plotOptions[selected.dataset.chartType]?.colors?.upper?? "#000000";
  upperColor.querySelector("input").style.color =
    options?.plotOptions[selected.dataset.chartType]?.colors?.upper?? "#000000";
  upperColor.querySelector("input").style.backgroundColor =
    options?.plotOptions[selected.dataset.chartType]?.colors?.upper?? "#000000";
    
  const lowerColor = colorItem.cloneNode(true);
  lowerColor.querySelector("input").value =
    options?.plotOptions[selected.dataset.chartType]?.colors?.lower?? "#ffffff";
  lowerColor.querySelector("input").style.color =
    options?.plotOptions[selected.dataset.chartType]?.colors?.lower?? "#ffffff";
  lowerColor.querySelector("input").style.backgroundColor =
    options?.plotOptions[selected.dataset.chartType]?.colors?.lower?? "#ffffff";

  upperColor.querySelector("input").addEventListener("input", (e) => {
    const selected = getSelected();
    if (!selected) return;
    const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
    if (!options) return;
    options.plotOption[selected.dataset.chartType].colors.upper = e.target.value;

    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options)
  });

  lowerColor.querySelector("input").addEventListener("input", (e) => {
    const selected = getSelected();
    if (!selected) return;
    const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
    if (!options) return;
    options.plotOption[selected.dataset.chartType].colors.lower = e.target.value;

    selected.dataset.chartOptions = JSON.stringify(options);
    renderApexChart(options)
  });
  boxPlotColors.append(upperColor,lowerColor)
}
