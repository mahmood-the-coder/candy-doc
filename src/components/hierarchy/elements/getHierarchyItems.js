import { findAncestor } from "../../find-ancestor/index.js";


export function getHierarchyItems(container) {
  return [...container.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(element => !element.classList.contains("candyDoc__hierarchyDummy") && !element.classList.contains("candyDoc__hierarchyTableOfContent") ).map((el, index) => {

    return {
      id: el.dataset.id,
      index: index,
      relativeNumber:el.dataset.relativeNumber,
      number: el.dataset.number,
      name: el?.querySelector("input")?.value??"",
      parentId: el?.parentElement?.dataset?.id ?? null,
      parentName:findAncestor(el,"candyDoc__hierarchyItemWrapper")?.querySelector("input")?.value??"none",
      innerHTML: document.body.querySelector(`[data-page-id='${el.dataset.id}']`)?.innerHTML ?? "",
      type: el.dataset.type,
      selected:el.dataset.selected,
      color:el.dataset.color
    };
  });

  


}