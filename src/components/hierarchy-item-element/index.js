import { UpdateDynamicText } from "../dynamic-text/index.js";
import { findAncestor } from "../find-ancestor/index.js";
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


window.addEventListener("input", (e) => {
  const item=findAncestor(e.target, "candyDoc__hierarchyItemWrapper")
  if (!item) return
  if (e.target.classList.contains("candyDoc__pageItemName") && item?.dataset?.type=="parent") {
    
    document.body.querySelector(".candyDoc__pagesWrapper")
      .querySelectorAll(
        `[data-parent-id='${item.dataset.id}']`
      )
      .forEach((p) => {
        p.dataset.parentName = e?.target?.value??"";
      });
    
   
      UpdateDynamicText()
  }
});