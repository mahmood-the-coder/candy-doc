import { findAncestor } from "../find-ancestor/index.js";
import { removeItem } from "../hierarchy-items/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { dragIcon } from "./elements/dragIcon.js";
import { head } from "./elements/head.js";
import { name } from "./elements/name.js";
import { nest } from "./elements/nest.js";
import { number } from "./elements/number.js";
import { removeIcon } from "./elements/removeIcon.js";
import { wrapper } from "./elements/wrapper.js";
export function createHierarchyItemElement(item) {

  nest.dataset.id = item.id;
  head.append(dragIcon, name, number, removeIcon);
  wrapper.append(head, nest);
  const clone = wrapper.cloneNode(true);
  clone.dataset.type = item.type;
  clone.dataset.id = item.id;
  clone.querySelector("input").value = item.name;
  clone.dataset.parentId = item.parentId;






  return clone;
}

window.addEventListener("mousedown",(e)=>{
 if(!e.target.classList.contains("candyDoc__hierarchyRemoveIcon"))return
 e.target.parentElement.parentElement.remove()
 removeItem(parseInt(e.target.parentElement.parentElement.dataset.index))
 getCenterLayoutElement().querySelector(`[data-page-id='${e.target.parentElement.parentElement.dataset.id}']`)?.remove()
  
})
window.addEventListener("input", (e) => {
  if (!findAncestor(e.target, "candyDoc__hierarchyItemWrapper")) return
  if (
    e.target.classList.contains("candyDoc__pageItemName") &&
    e.target.parentElement.parentElement.dataset.type != "parent"
  ) {
    const headerPageTitle = document.body.querySelectorAll(
      ".candyDoc__runningHeaderPageTitleTextBox"
    );
    headerPageTitle.forEach((p) => {
      p.innerText = e.target.value;
    });
    const footerPageTitle = document.body.querySelectorAll(
      ".candyDoc__runningFooterPageTitleTextBox"
    );
    footerPageTitle.forEach((p) => {
      p.innerText = e.target.value;
    });

    document.body.querySelector(
      `[data-page-id='${e.target.parentElement.parentElement.dataset.id}']`
    ).dataset.name = e.target.value;
  }

  if (
    e.target.classList.contains("candyDoc__pageItemName") &&
    e.target.parentElement.parentElement.dataset.type == "parent"
  ) {
    const headerChapterTitle = document.body.querySelectorAll(
      ".candyDoc__runningHeaderChapterTitleTextBox"
    );
    headerChapterTitle.forEach((c) => {
      c.innerText = e.target.value;
    });
    const footerChapterTitle = document.body.querySelectorAll(
      ".candyDoc__runningFooterChapterTitleTextBox"
    );
    footerChapterTitle.forEach((c) => {
      c.innerText = e.target.value;
    });
    document.body
      .querySelectorAll(
        `[data-parent-id='${e.target.parentElement.parentElement.dataset.id}']`
      )
      .forEach((p) => {
        p.dataset.parentName = e.target.value;
      });
  }
});