import { getToggle,setToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
import { addChartOptionsColors } from "../../chart-colors-tool/elements/colors/colors.js";
import { filterChartOptions } from "../index.js";
export const isFunnel = document.createElement("div");
isFunnel.classList.add(
  "candyDoc__inspectorChartOptionItem",
  "candyDoc__inspectorChartOptionItemIsFunnel"
);
isFunnel.dataset.option = "isFunnel";
isFunnel.dataset.chartType = "bar";

const toggle=getToggle("Funnel",false)
isFunnel.append(toggle);
toggle.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    plotOptions: {
      ...options?.plotOptions,
      bar: {
        ...(options?.plotOptions?.bar ?? undefined),
        isFunnel: e.target.checked,
      },
    },
  }
  addChartOptionsColors(options?.colors??[],options.plotOptions?.bar?.isFunnel??false)
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options?.plotOption?.bar?.isHorizontal) {
    isFunnel.style.display = "none"
  }
  if (!options) return;
  isFunnel.value = options?.plotOptions?.bar?.isFunnel
  setToggle(isFunnel,isFunnel.value)
    filterChartOptions(selected)

})