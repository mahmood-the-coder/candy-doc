import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
import { renderApexChart } from "../../render.js";
export const pattern = document.createElement("div");
pattern.classList.add("candyDoc__inspectorChartOptionItem","candyDoc__inspectorChartPattern");
pattern.style.display="none"
const multiChoice = getMultiChoices(
  [
    { label: "Vertical", value: "verticalLines" },
    { label: "Horizontal", value: "horizontalLines" },
    { label: "Squares", value: "squares" },
    { label: "Circles", value: "circles" },
    { label: "Slanted", value: "slantedLines" },
  ],
  "Type",
  "solid",

);

pattern.append(multiChoice);

multiChoice.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  options = {
    ...options,
    fill: {
      ...(options?.fill ?? undefined),
      pattern: {
        ...(options?.fill?.pattern ?? undefined),
        style: e.target.dataset.value,
      },
    },
  };
  selected.dataset.chartOptions = JSON.stringify(options);
  renderApexChart(options)
});
window.addEventListener("mouseup",(e)=>{
  const selected = getSelected();
  if (!selected) return;
  let options = JSON.parse(selected?.dataset?.chartOptions ?? "null");

   multiChoice.querySelectorAll(".item").forEach(i=>{
    i.classList.remove("candyDoc__multiChoiceSelected")
   })
   multiChoice.querySelector(`[data-value='${options?.fill?.pattern?.style}']`)?.classList?.add("candyDoc__multiChoiceSelected")

 
})