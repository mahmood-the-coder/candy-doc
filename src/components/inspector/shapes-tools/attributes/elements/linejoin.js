import { getMultiChoices } from "../../../../editor-UI/multi-choice/index.js";
import { getSelected } from "../../../../selection/index.js";
export const linejoin = document.createElement("div");
linejoin.classList.add("candyDoc__inspectorLinejoin");
const controller = getMultiChoices(
  [
    { label: "Miter", value: "miter" },
    { label: "Round", value: "round" },
    { label: "Bevel", value: "bevel" },
  ],
  "Linejoin",
  "miter",
);
linejoin.append(controller);
controller.addEventListener("input", (e) => {
  const selected = getSelected();
  if (!selected) return;
   console.log(e.target);
   
  selected.style.strokeLinejoin = e.target.parentElement.dataset.value;
});
