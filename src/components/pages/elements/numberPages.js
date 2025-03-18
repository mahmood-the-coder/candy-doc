import { findAncestor } from "../../find-ancestor/index.js";
import { hierarchyContainer } from "../../hierarchy/elements/container.js";
import { userData } from "../../user-data/userData.js";
export function numberPages() {
  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
  const pages = [...pageWrapper.querySelectorAll(".candyDoc__page")].filter(p => !p.classList.contains("candyDoc__tableOfContentPage"))
  pages.forEach((p, index) => {
    const hierarchyItem = hierarchyContainer.querySelector(`[data-id='${p.dataset.pageId}']`)
    const parent = findAncestor(hierarchyItem, "candyDoc__hierarchyChapter");
    const item = userData.hierarchyItems.find(i => i.id == p.dataset.pageId);
    item.index = p.dataset.index = index.toString()
    item.relativeNumber = item.number = p.dataset.number = (index + 1).toString()
    item.parentName = document.timeline
    if (parent) {
      item.relativeNumber = p.dataset.relativeNumber = [...parent.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(i => i.dataset.type == "page").findIndex(i => i == hierarchyItem) + 1;
      item.parentName = p.dataset.parentName = parent?.querySelector("input")?.value ?? "none"
      item.parentId = p.dataset.parentId = parent.dataset.id

    }

  })
}