import { getHierarchyItems } from "../../../hierarchy-items/index.js";
import { initCirclesAll } from "../../../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../../../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../../../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../../../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../../../inspector/shapes-tools/insert/elements/square.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { editor } from "../editor.js";

export const applyPage = document.createElement("div");
applyPage.classList.add(
  "candyDoc__runningHeaderApplyPage",
  "candyDoc__runningHeaderTool"
);
applyPage.innerText = "Apply To The Page";
applyPage.addEventListener("mousedown", () => {
  const cursor = document.body.querySelector(".candyDoc__cursor");
  const page = cursor.parentElement.parentElement;

  getHierarchyItems().find((i) => i.id == page.dataset.pageId);

  const pageHeader = page.querySelector(".candyDoc__pageHeader");
  const clone=editor.cloneNode(true);
  clone.querySelector(".candyDoc__cursor")?.remove()
  pageHeader.innerHTML = clone.innerHTML;
   setTimeout(() => {
    initSquareAll(getCenterLayoutElement());
    initCirclesAll(getCenterLayoutElement());
    initLinesAll(getCenterLayoutElement());
    initEllipsesAll(getCenterLayoutElement());
    initCurvesAll(getCenterLayoutElement())
  }, 100);
});
