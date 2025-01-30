import { getHierarchyItems } from "../../../hierarchy-items/index.js";
import { initCirclesAll } from "../../../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../../../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../../../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../../../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../../../inspector/shapes-tools/insert/elements/square.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { editor } from "../editor.js";
export const applyAll = document.createElement("div");
applyAll.classList.add(
  "candyDoc__runningHeaderApplyAll",
  "candyDoc__runningHeaderTool"
);
applyAll.innerText = "Apply To All Pages";
applyAll.addEventListener("mousedown", () => {
  getHierarchyItems().forEach((i) => {
    i.runningHeader = editor.outerHTML;
  });
  const pages = document.body.querySelectorAll(".candyDoc__page");
  pages.forEach((p) => {
    const pageHeader = p.querySelector(".candyDoc__pageHeader");
    const clone=editor.cloneNode(true);
    clone.querySelector(".candyDoc__cursor")?.remove()
    clone.style.zIndex="10"
    pageHeader.innerHTML = clone.innerHTML;
   
  });
  setTimeout(() => {
    initSquareAll(getCenterLayoutElement());
    initCirclesAll(getCenterLayoutElement());
    initLinesAll(getCenterLayoutElement());
    initEllipsesAll(getCenterLayoutElement());
    initCurvesAll(getCenterLayoutElement())
  }, 100);
});
