import { findAncestor } from "../find-ancestor/index.js";
import { setHierarchySelect } from "../hierarchy/elements/select.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { dragIcon } from "./elements/dragIcon.js";
import { head } from "./elements/head.js";
import { name } from "./elements/name.js";
import { nest } from "./elements/nest.js";
import { removeIcon } from "./elements/removeIcon.js";
import { wrapper } from "./elements/wrapper.js";
export function createHierarchyItemElement(item) {

  nest.dataset.id = item.id;
  head.append(dragIcon, name, removeIcon);
  wrapper.append(head,nest);
 
  const clone = wrapper.cloneNode(true);
  clone.dataset.type = item.type;
  clone.dataset.id = item.id;
  clone.querySelector("input").value = item.name;
  clone.dataset.parentId = item.parentId;
  if(item.type=="page")
  {
    clone.querySelector(".nest").style.height="0px"
  }
  return clone;
}

window.addEventListener("mousedown",(e)=>{
 if(!e.target.classList.contains("candyDoc__hierarchyRemoveIcon"))return
 e.target.parentElement.parentElement.remove()
 getCenterLayoutElement().querySelector(`[data-page-id='${e.target.parentElement.parentElement.dataset.id}']`)?.remove()
 setHierarchySelect(null)
  
})
window.addEventListener("input", (e) => {
  if (!findAncestor(e.target, "candyDoc__hierarchyItemWrapper")) return
  if (
    e.target.classList.contains("candyDoc__pageItemName") &&
    e.target.parentElement.parentElement.dataset.type != "parent"
  ) {
    const headerPageTitle = document.body.querySelectorAll(
      ".candyDoc__pageActionsPageTitleTextBox"
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
      ".candyDoc__pageActionsChapterTitleTextBox"
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