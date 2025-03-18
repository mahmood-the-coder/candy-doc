import { UpdateDynamicText } from "../../../dynamic-text/index.js";
import { findAncestor } from "../../../find-ancestor/index.js";
import { initCirclesAll } from "../../../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../../../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../../../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../../../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../../../inspector/shapes-tools/insert/elements/square.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { getSelectedElements } from "../../../selection/index.js";

export const applyChapter = document.createElement("div");
applyChapter.classList.add(
  "candyDoc__pageActionsApplyChapter",
  "candyDoc__pageActionsTool"
);
applyChapter.innerText = "Apply To Chapter Pages";
applyChapter.addEventListener("mousedown", () => {


  const selectedElements = getSelectedElements();
  const originContent = document.body.querySelector(".candyDoc__cursor").parentElement;
  if (!originContent) return;
  const page = findAncestor(originContent, "candyDoc__page")
  if (!page) return;
  const parentId = page.dataset.parentId;
  if (!parentId || parentId == "null") return;
  selectedElements.forEach(selected => {
    document.body.querySelectorAll(`[data-parent-id='${parentId}']`).forEach(page => {


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
})