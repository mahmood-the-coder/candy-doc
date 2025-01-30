import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
export const linecap = document.createElement("div");
linecap.classList.add("candyDoc__inspectorLinecap");
const controller = getMultiChoices(
 
  [
    { label: "Butt", value: "butt" },
    { label: "Round", value: "round" },
    { label: "Square", value: "square" },
  ],
  "Linecap",
  "butt",
);
linecap.append(controller);
controller.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
 
  selected.style.strokeLinecap = e.target.parentElement.dataset.value;
});
