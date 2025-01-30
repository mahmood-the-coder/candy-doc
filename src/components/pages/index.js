import { getContent } from "../content/index.js";
import { getHierarchyItems } from "../hierarchy-items/index.js";
import { getLeftContainer } from "../left-container/index.js";
import { getRightContainer } from "../right-container/index.js";
import { page } from "./elements/page.js";
import { wrapper } from "./elements/wrapper.js";
export function createPages() {
  wrapper.innerHTML = "";
  getHierarchyItems()
    .filter((i) => i.type != "parent")
    .forEach((i) => {
      const page = createPage(i);

      wrapper.append(page);
    });
  return wrapper;
}
export function createPage(item) {
  const content = getContent().cloneNode(true);

  content.innerHTML = item.innerHTML;
  page.append(content);
  const clone = page.cloneNode(true);
  clone.dataset.pageId = item.id;
  clone.dataset.index = item.index;
  clone.dataset.name = item.name;

  const pageHeader = document.createElement("div");
  pageHeader.classList.add("candyDoc__pageHeader");

  const pageFooter = document.createElement("div");
  pageFooter.classList.add("candyDoc__pageFooter");

  const leftContainer = getLeftContainer().cloneNode(true);
  const rightContainer = getRightContainer().cloneNode(true);
  clone.append(pageHeader, pageFooter, leftContainer, rightContainer);

  if (item.parentId) {
    clone.dataset.parentId = item.parentId;
    clone.dataset.relativeIndex = getHierarchyItems()
      .filter((i) => i.parentId == item.parentId)
      .findIndex((i) => i.id == item.id);
    clone.dataset.parentName = getHierarchyItems().find(
      (i) => i.id == item.parentId
    ).name;
  } else {
    clone.dataset.relativeIndex = item.index;
    clone.dataset.parentName = item.name;
  }
  return clone;
}


