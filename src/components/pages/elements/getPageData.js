import { getCenterLayoutElement } from "../../layout/index.js";


export function getPagesData() {


  const pagesWrapperElement = getCenterLayoutElement().querySelector(
    ".candyDoc__pagesWrapper"
  );
  const pagesWrapperClone = pagesWrapperElement.cloneNode(true);
  pagesWrapperClone.querySelectorAll(".ce-toolbar__actions").forEach(t => t.remove());
  pagesWrapperClone.querySelectorAll(".ce-popover__container").forEach(t => t.remove());
  pagesWrapperClone.querySelectorAll("[data-placeholder-active]").forEach(t => t.dataset.placeholderActive = "");
  pagesWrapperClone.querySelectorAll(".candyDoc__tableCellTransformedIcon").forEach(t => t.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__rulerHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__resizeHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__dragHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__removeIcon")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__cursor")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__tableHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__selectIndicator")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__shapeHandle")
    .forEach((n) => n.remove());
  pagesWrapperClone
    .querySelectorAll(".candyDoc__textSelectionIndicator")
    .forEach((n) => n.remove());


  pagesWrapperClone.querySelectorAll(".removable").forEach(el => el.classList.remove("removable"));
  pagesWrapperClone.querySelectorAll(".candyDoc__selectedText").forEach(el => el.classList.remove("candyDoc__selectedText"));
  pagesWrapperClone.querySelectorAll(".draggable").forEach(el => el.classList.remove("draggable"));
  pagesWrapperClone.querySelectorAll(".resizable").forEach(el => el.classList.remove("resizable"));
  pagesWrapperClone.querySelectorAll(".selectable").forEach(el => el.classList.remove("selectable"));
  pagesWrapperClone.querySelectorAll(".candyDoc__textBox").forEach(el => el.contentEditable = "false");
  pagesWrapperClone.querySelectorAll(".candyDoc__page").forEach(p => p.style.backgroundColor = "white");
  pagesWrapperClone.querySelectorAll("*:not(.candyDoc__page)").forEach(el => { el.style.outline = "none"; });
  return pagesWrapperClone;
}
