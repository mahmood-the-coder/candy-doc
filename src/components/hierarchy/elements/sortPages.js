import { container } from "./container.js";
import { getHierarchyItems } from "./getHierarchyItems.js";

export function sortPages() {
  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
  const pages = [...pageWrapper.querySelectorAll(".candyDoc__page")];

  pages.forEach((p) => {
    const hierarchyItems=getHierarchyItems(container)
    const item = hierarchyItems.find((i) => i.id == p.dataset.pageId);
    if (!item) return;
    p.dataset.index = item.index;
    const itemElement=container.querySelector(`[data-id='${item.id}']`);
    if(item.parentId)
      {
      const parentElement=container.querySelector(`[data-id='${item.parentId}']`)
      const childIndex=[...itemElement.parentElement.children].findIndex(el=>el==itemElement);
      p.dataset.parentId = item.parentId;
      p.dataset.relativeIndex=childIndex
      p.dataset.parentName=parentElement.querySelector("input").value
    }
    else
    {
      p.dataset.parentId = "null";
      p.dataset.relativeIndex="none"
      p.dataset.parentName="none"
    }
  });

  pages
    .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index))
    .forEach((p,index) => {
      pageWrapper.append(p);
      if(p.dataset.relativeIndex=="none")
      {
        p.dataset.relativeIndex=index
      }
      p.dataset.index=index
    });

  
}
