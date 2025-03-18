import { createHierarchyItemElement } from "../../hierarchy-item-element/index.js";

import { getHierarchySelect } from "./select.js";
import { hierarchyContainer } from "./container.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { userData } from "../../user-data/userData.js";
import { getRandomInt } from "../../random-Int/index.js";
import { numberPages } from "../../pages/elements/numberPages.js";
import { sortPages } from "../../pages/elements/sortPages.js";
export const addChapterIcon = document.createElement("div");
addChapterIcon.dataset.tooltip = "add chapter"
addChapterIcon.innerHTML =
  /*html*/
  `
<svg
  pointerEvents="none"
  width="30px"
  height="30px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>
`;

addChapterIcon.classList.add("candyDoc__icon");
addChapterIcon.addEventListener("mouseup", () => {
  const newItem = {
    index: 1,
    id: "item__" + Date.now().toString(16),
    number: 1,
    name: "new chapter",
    type: "parent",
    parentId: null,
    color: "white"
  };
  const select = getHierarchySelect();
  const itemElement = createHierarchyItemElement(newItem);
  itemElement.classList.add("candyDoc__hierarchyChapter")
  const color = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.5)`;
  itemElement.dataset.color = color;
  itemElement.style.backgroundColor = color;
  newItem.color = color
  if (select && select.parentElement) {
    if (select.dataset.type == "parent") {
      select
        .querySelector(".candyDoc__nestedHierarchyItems")
        .append(itemElement);
    } else {
      select.parentElement.insertBefore(itemElement, select.nextElementSibling);
    }
  } else {
    hierarchyContainer.append(itemElement);
  }
  userData.hierarchyItems.push(newItem)
  setTimeout(() => {
    sortPages()
    numberPages()

  if (document.body.querySelector(".candyDoc__tableOfContent"))
    generateTableOfContent()
  }, 10);

});