import { createHierarchyItemElement } from "../../hierarchy-item-element/index.js";
import {

  sortHierarchyItems,
} from "../../hierarchy-items/index.js";
import { createPage } from "../../pages/index.js";
import { numberHierarchyItemElements } from "./numbering.js";
import { getHierarchySelect } from "./select.js";
import { sortPages } from "./sortPages.js";
import { container } from "./container.js";
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
addPageIcon.addEventListener("mousedown", () => {
  const newItem = {
    index: 1,
    id: "item__" + Date.now().toString(16),
    number: 1,
    name: "new page",
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
    } else {

      select.parentElement.insertBefore(itemElement, select.nextElementSibling);
    }

  } else {
    container.append(itemElement);
  }
  numberHierarchyItemElements();
  sortHierarchyItems();
  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
  const newPageElement = createPage(newItem);
  pageWrapper.append(newPageElement);
  sortPages();

});