import { createHierarchyItemElement } from "../../hierarchy-item-element/index.js";

import { createPage } from "../../pages/index.js";
import { getHierarchySelect } from "./select.js";
import { hierarchyContainer } from "./container.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";
import { cursor, initCursor } from "../../insert/cursor.js";
import { numberPages } from "../../pages/elements/numberPages.js";
export const addPageIcon = document.createElement("div");
addPageIcon.dataset.tooltip = "add page"
addPageIcon.innerHTML =
  /*html*/
  `
<svg
  pointerEvents="none"
  fill="var(--color)"
  width="30px"
  height="30px"
  viewBox="-3.5 0 19 19"
  xmlns="http://www.w3.org/2000/svg"
  class="cf-icon-svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M11.16 16.153a.477.477 0 0 1-.476.475H1.316a.477.477 0 0 1-.475-.475V3.046a.477.477 0 0 1 .475-.475h6.95l2.893 2.893zm-1.11-9.924H8.059a.575.575 0 0 1-.574-.574V3.679H1.95v11.84h8.102zm-1.519 4.198a.475.475 0 0 1-.475.475H6.475v1.582a.475.475 0 1 1-.95 0v-1.582H3.944a.475.475 0 0 1 0-.95h1.581v-1.58a.475.475 0 0 1 .95 0v1.58h1.581a.475.475 0 0 1 .475.475z"
    ></path>
  </g>
</svg>
`;
addPageIcon.classList.add("candyDoc__icon");
addPageIcon.addEventListener("mouseup", () => {
  const newItem = {
    index: 0,
    id: "item__" + Date.now().toString(16),
    number: 1,
    name: "page",
    type: "page",
    parentId: null,
    innerHTML: "",

  };
  const select = getHierarchySelect();
  const itemElement = createHierarchyItemElement(newItem);
  if (select && select.parentElement) {
    if (select.dataset.type == "parent") {
      select
        .querySelector(".candyDoc__nestedHierarchyItems")
        .append(itemElement);
      const index = [...select.querySelector(".nest").querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(i => !i.classList.contains("candyDoc__hierarchyDummy") && !i.classList.contains("candyDoc__tableOfContent") && !i.classList.contains("candyDoc__hierarchyChapter")).findIndex(c => c == itemElement);
      itemElement.dataset.relativeNumber = newItem.number = index + 1;
      itemElement.querySelector("input").value = itemElement.dataset.name = newItem.name = "page " + (index + 1)
    } else {

      select.parentElement.insertBefore(itemElement, select.nextElementSibling);
      const index = [...select.parentElement.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(i => !i.classList.contains("candyDoc__hierarchyDummy") && !i.classList.contains("candyDoc__tableOfContent") && !i.classList.contains("candyDoc__hierarchyChapter")).findIndex(c => c == itemElement);
      itemElement.dataset.index = newItem.index = index;
      itemElement.dataset.relativeNumber = itemElement.dataset.number = newItem.number = index + 1;

      itemElement.querySelector("input").value = itemElement.dataset.name = newItem.name = "page " + (index + 1)
    }

  } else {
    hierarchyContainer.append(itemElement);
    const index = [...hierarchyContainer.querySelectorAll(".candyDoc__hierarchyItemWrapper")].filter(i => !i.classList.contains("candyDoc__hierarchyDummy") && !i.classList.contains("candyDoc__tableOfContent") && !i.classList.contains("candyDoc__hierarchyChapter")).findIndex(c => c == itemElement);
    itemElement.dataset.index = newItem.index = index;
    itemElement.dataset.relativeNumber = itemElement.dataset.number = newItem.number = index + 1;
    itemElement.querySelector("input").value = itemElement.dataset.name = newItem.name = "page " + (index + 1)
  }

  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
  let newPageElement = createPage(newItem);
  newPageElement.dataset.number = itemElement.dataset.number
  newPageElement.dataset.relativeNumber = itemElement.dataset.relativeNumber
  userData.hierarchyItems.push(newItem)
  const firstPage=pageWrapper.querySelector(".candyDoc__page");
  if(firstPage)
  {
    const clone=firstPage.cloneNode(true)
    clone.querySelector(".candyDoc__content").innerHTML="";
    clone.querySelector(".candyDoc__pageFooter").innerHTML="";
    clone.querySelector(".candyDoc__pageHeader").innerHTML="";
    clone.querySelector(".candyDoc__leftContainer").innerHTML="";
    clone.querySelector(".candyDoc__rightContainer").innerHTML="";
    newPageElement=clone;
  }
  pageWrapper.append(newPageElement);
  const currentCursor = document?.querySelector(".candyDoc__cursor") ?? cursor
  newPageElement.querySelector(".candyDoc__content").append(currentCursor)
  setTimeout(() => {
    numberPages()
  if (document.body.querySelector(".candyDoc__tableOfContent"))
    generateTableOfContent()
  }, 10);


});