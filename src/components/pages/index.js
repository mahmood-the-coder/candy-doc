
import { userData } from "../user-data/userData.js";
import { wrapper } from "./elements/wrapper.js";
export function createPages() {
  wrapper.innerHTML = "";
  userData.hierarchyItems
    .filter((i) => i.type != "parent")
    .forEach((i) => {
      const page = createPage(i);

      wrapper.append(page);
    });

  return wrapper;
}
export function createPage(item) {
  const content = document.createElement("div");
  content.classList.add("candyDoc__content")
  const page = document.createElement("div");
  page.classList.add("candyDoc__page");
  content.innerHTML = item.innerHTML;
  page.append(content);
  page.dataset.pageId = item.id;
  page.dataset.index = item.index;
  page.dataset.name = item.name;
  page.dataset.relativeNumber = item.number
  page.dataset.number = item.number
  page.dataset.relativeIndex = item.index;
  page.dataset.parentName = item.name;
  const pageHeader = document.createElement("div");
  pageHeader.classList.add("candyDoc__pageHeader");

  const pageFooter = document.createElement("div");
  pageFooter.classList.add("candyDoc__pageFooter");

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("candyDoc__leftContainer");
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("candyDoc__rightContainer");
  page.append(pageHeader, pageFooter, leftContainer, rightContainer);

  if (item.parentId) {
    page.dataset.parentId = item.parentId;
    page.dataset.relativeNumber = userData.hierarchyItems
      .filter((i) => i.parentId == item.parentId)
      .findIndex((i) => i.id == item.id) + 1;
    page.dataset.parentName = userData.hierarchyItems.find(
      (i) => i.id == item.parentId
    ).name;
  }
  return page;
}


