import { findAncestor } from "../../../find-ancestor/index.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { getSelected } from "../../../selection/index.js";
import { fill } from "./elements/fill.js";
import { linecap } from "./elements/linecap.js";
import { linejoin } from "./elements/linejoin.js";
import { stroke } from "./elements/stroke.js";
import { strokeDashArray } from "./elements/strokeDashArray.js";
import { strokeWidth } from "./elements/strokeWith.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorShapesAttributesTools() {
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if (!getCenterLayoutElement().contains(e.target)) return;
  if (!findAncestor(e.target, "candyDoc__shapeSVG")) return;
  if (e.target.classList.contains("candyDoc__shapeSVG")) return;
  [...linejoin.querySelectorAll(".candyDoc___editorUIMultiChoiceItem")].forEach(i=>i.classList.remove("candyDoc__multiChoiceSelected"));
  [...linecap.querySelectorAll(".candyDoc___editorUIMultiChoiceItem")].forEach(i=>i.classList.remove("candyDoc__multiChoiceSelected"));
  setTimeout(() => {
    const selected = getSelected();
    if (!selected) return;
    
    stroke.querySelector("input").value = selected.style.stroke;
    stroke.querySelector("input").style.color =
    stroke.querySelector("input").value;
    stroke.querySelector("input").style.backgroundColor =
    stroke.querySelector("input").value;
    fill.querySelector("input").value = selected.style.fill;
    fill.querySelector("input").style.color = fill.querySelector("input").value;
    fill.querySelector("input").style.backgroundColor =
    fill.querySelector("input").value;
    strokeWidth.querySelector("input").value =
    selected.style.strokeWidth.replace("px", "");
    strokeDashArray.querySelector("input").value =
    selected.style.strokeDasharray;
    
    const linejoinChoice = [...linejoin.querySelectorAll(".candyDoc___editorUIMultiChoiceItem")].find((i) =>
      getComputedStyle(selected).strokeLinejoin==i.dataset.value
  );
    if (linejoinChoice)
      linejoinChoice.classList.add(
        "candyDoc__multiChoiceSelected"
      );
      console.log(getComputedStyle(selected).strokeLinejoin,linejoinChoice.value)

    const linecapChoice = [...linecap.querySelectorAll(".candyDoc___editorUIMultiChoiceItem")].find((i) =>
      getComputedStyle(selected).strokeLinecap==i.dataset.value
    );
    if (linecapChoice)
      linecapChoice.classList.add(
        "candyDoc__multiChoiceSelected"
      );
  }, 100);
});
