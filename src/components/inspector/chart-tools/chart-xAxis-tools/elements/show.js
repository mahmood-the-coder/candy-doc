import { getToggle } from "../../../../editor-UI/toggle/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const showXAxis = document.createElement("div");
showXAxis.classList.add("candyDoc__inspectorChartOptionItem")
const toggle = getToggle("show", true);
showXAxis.append(toggle);
toggle.querySelector("input").addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

  options = {
    ...options,
    xaxis: {

      ...(options?.xaxis ?? undefined),
      labels:{
        ...(options?.xaxis?.labels ?? undefined),
        show:e.target.checked
      }
      ,
      axisBorder: {
        ...(options?.xaxis?.axisBorder ?? undefined),
        show: e.target.checked
      },
      axisTicks:{
        ...(options?.xaxis?.axisTicks ?? undefined),
        show: e.target.checked
      }
  
    },
   
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
