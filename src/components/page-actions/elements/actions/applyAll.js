import { UpdateDynamicText } from "../../../dynamic-text/index.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { initCirclesAll } from "../../../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../../../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../../../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../../../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../../../inspector/shapes-tools/insert/elements/square.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { getSelectedElements } from "../../../selection/index.js";
export const applyAll = document.createElement("div");
applyAll.classList.add(
  "candyDoc__pageActionsApplyAll",
  "candyDoc__pageActionsTool"
);
applyAll.innerText = "Apply To All Pages";
applyAll.addEventListener("mousedown", () => {
 const selectedElements = getSelectedElements();
  const originContent = document.body.querySelector(".candyDoc__cursor").parentElement;
  if (!originContent) return;
  const page = findAncestor(originContent, "candyDoc__page")
  if (!page) return;
  const parentId = page?.dataset?.parentId??"null";

  selectedElements.forEach(selected => {
    document.body.querySelectorAll(`.candyDoc__page`).forEach(page => {


      const content = page.querySelector("." + originContent.className);
      if (content) {
        const clone = selected.cloneNode(true)
        clone.classList.remove("selected")
        clone.dataset.chapterId = parentId
        const contentParent = findAncestor(content, "candyDoc__page");
        const selectedParent = findAncestor(selected, "candyDoc__page");
        if (contentParent != selectedParent) {
          const exist = contentParent.querySelector("#" + clone.id);
          if (!exist)
            content.append(clone)
          else {
            content.replaceChild(clone, exist)
          }

        }

      }


    })
    setTimeout(() => {
      initSquareAll(getCenterLayoutElement());
      initCirclesAll(getCenterLayoutElement());
      initLinesAll(getCenterLayoutElement());
      initEllipsesAll(getCenterLayoutElement());
      initCurvesAll(getCenterLayoutElement())
      UpdateDynamicText()
    }, 100);
  })
});
