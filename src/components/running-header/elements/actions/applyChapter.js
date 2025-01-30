import { getHierarchyItems } from "../../../hierarchy-items/index.js";
import { initCirclesAll } from "../../../inspector/shapes-tools/insert/elements/circle.js";
import { initCurvesAll } from "../../../inspector/shapes-tools/insert/elements/curve.js";
import { initEllipsesAll } from "../../../inspector/shapes-tools/insert/elements/ellipse.js";
import { initLinesAll } from "../../../inspector/shapes-tools/insert/elements/line.js";
import { initSquareAll } from "../../../inspector/shapes-tools/insert/elements/square.js";
import { getCenterLayoutElement } from "../../../layout/index.js";
import { editor } from "../editor.js";

export const applyChapter = document.createElement("div");
applyChapter.classList.add(
  "candyDoc__runningHeaderApplyChapter",
  "candyDoc__runningHeaderTool"
);
applyChapter.innerText = "Apply To Chapter Pages";
applyChapter.addEventListener("mousedown", () => {
  const cursor=document.body.querySelector(".candyDoc__cursor");
  const page=cursor.parentElement.parentElement;
  const parentId=page.dataset.parentId;
  if(!parentId)return;

  getHierarchyItems().filter(i=>i.parentId==parentId).forEach((i) => {
    i.runningHeader = editor.outerHTML;
  });
  const pages = document.body.querySelectorAll(".candyDoc__page");
  [...pages].filter(p=>p.dataset.parentId==parentId).forEach((p) => {
    const pageHeader = p.querySelector(".candyDoc__pageHeader");
    const clone=editor.cloneNode(true);
    clone.querySelector(".candyDoc__cursor")?.remove()
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
