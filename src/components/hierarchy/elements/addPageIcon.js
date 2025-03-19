import { createHierarchyItemElement } from "../../hierarchy-item-element/index.js";
import { createPage } from "../../pages/index.js";
import { getHierarchySelect } from "./select.js";
import { hierarchyContainer } from "./container.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";
import { cursor } from "../../insert/cursor.js";
import { numberPages } from "../../pages/elements/numberPages.js";
import { sortPages } from "../../pages/elements/sortPages.js";
import { leftRuler } from "../../ruler/elements/left.js";
import { rightRuler } from "../../ruler/elements/right.js";
import { topRuler } from "../../ruler/elements/top.js";
import { bottomRuler } from "../../ruler/elements/bottom.js";
import { getLeftContainer } from "../../left-container/index.js";
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
  const newPageElement = createPage(newItem);
  newPageElement.dataset.number = itemElement.dataset.number
  newPageElement.dataset.relativeNumber = itemElement.dataset.relativeNumber
  userData.hierarchyItems.push(newItem)
  pageWrapper.append(newPageElement);
  const content = newPageElement.querySelector(".candyDoc__content");
  content.style.left = leftRuler?.style?.left??"50px"
  content.style.right = rightRuler?.style?.right??"50px"
  content.style.top = topRuler?.style?.top??"100px"
  content.style.bottom = bottomRuler?.style?.bottom??"100px"
  const leftContainer = newPageElement.querySelector(".candyDoc__leftContainer");
  leftContainer.style.right = `calc(100% - ${leftRuler?.style?.left??"50px"})`
  const rightContainer = newPageElement.querySelector(".candyDoc__rightContainer");
  rightContainer.style.left = `calc(100% - ${rightRuler?.style?.right??"50px"})`
  const footer = newPageElement.querySelector(".candyDoc__pageFooter");
  footer.style.top = content?.style?.bottom??"100px"
  footer.style.bottom = 0;
  footer.style.left = content?.style?.left??"50px"
  footer.style.right = content?.style?.right??"50px"
  const header = newPageElement.querySelector(".candyDoc__pageHeader");
  header.style.bottom = content?.style?.top??"100px"
  header.style.top = 0;
  header.style.left = content?.style?.left??"50px"
  header.style.right = content?.style?.right??"50px"
  const currentCursor = document?.querySelector(".candyDoc__cursor") ?? cursor
  newPageElement.querySelector(".candyDoc__content").append(currentCursor)
  setTimeout(() => {
    sortPages()
    numberPages()
    if (document.body.querySelector(".candyDoc__tableOfContent"))
      generateTableOfContent()
  }, 10);


});