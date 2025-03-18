import { getSelected } from "../../../selection/index.js";
import { createBackgroundRepeatItem } from "./backgroundRepeatItem.js";
import { getBackgroundRepeatArray } from "./getBackgroundRepeat.js";
export const list = document.createElement("div");
list.classList.add("candyDoc__inspectorBackgroundRepeatList");
const addItemIcon = document.createElement("div");
addItemIcon.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  height="15px"
  width="15px"
  version="1.1"
  id="XMLID_313_"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 24 24"
  xml:space="preserve"
  stroke="var(--color)"
  strokeWidth="0.00024000000000000003"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g id="add">
      <g>
        <polygon
          points="13,24 11,24 11,13 0,13 0,11 11,11 11,0 13,0 13,11 24,11 24,13 13,13 "
        ></polygon>
      </g>
    </g>
  </g>
</svg>
`;
addItemIcon.classList.add("candyDoc__icon", "candyDoc__addBackgroundRepeatIcon");
export function createBackgroundRepeatList(items) {
  list.innerHTML = "";
  list.append(addItemIcon);
  items.forEach((item, index) => {
    const itemElement = createBackgroundRepeatItem(item, index);
    list.append(itemElement);
  });
  return list
}

addItemIcon.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;
 
  const newRepeat="repeat"
  getBackgroundRepeatArray().push(newRepeat)

  createBackgroundRepeatList(getBackgroundRepeatArray())
  selected.style.backgroundRepeat = getBackgroundRepeatArray().join(", ");
 
  
});
