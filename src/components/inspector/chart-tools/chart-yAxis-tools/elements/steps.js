import { getNumberInput } from "../../../../editor-UI/number/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const steps=document.createElement("div");
steps.classList.add("candyDoc__inspectorChartOptionItem")
const number=getNumberInput("Steps",true,20,1,100,1,(value)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
 
  
  options = {
    ...options,
    yaxis: {
      ...(options?.yaxis ?? undefined),
      stepSize: parseInt(value),
    },
  };

  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
steps.append(number)
