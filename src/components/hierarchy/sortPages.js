import { getHierarchyItems } from "../hierarchy-items/index.js";

export function sortPages() {
  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
  const pages = [...pageWrapper.querySelectorAll(".candyDoc__page")];

  pages.forEach((p) => {
    const item = getHierarchyItems().find((i) => i.id == p.dataset.pageId);
    if (!item) return;
    p.dataset.index = item.index;
    p.dataset.parentId = item.parentId;
  });

  pages
    .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index))
    .forEach((p) => {
      pageWrapper.append(p);
    });
}
