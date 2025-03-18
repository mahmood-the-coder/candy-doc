import { getSelected } from "../../../selection/index.js";
import { createBackgroundSizeItem } from "./backgroundSizeItem.js";
import { getBackgroundSizeArray } from "./getBackgroundSize.js";
export const list = document.createElement("div");
list.classList.add("candyDoc__inspectorBackgroundSizeList");
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
addItemIcon.classList.add("candyDoc__icon", "candyDoc__addBackgroundSizeIcon");
export function createBackgroundSizeList(items) {
  list.innerHTML = "";
  list.append(addItemIcon);
  items.forEach((item, index) => {
    const itemElement = createBackgroundSizeItem(item, index);
    list.append(itemElement);
  });
  return list
}

addItemIcon.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;
 
  const newSize=["100%","100%"]
  getBackgroundSizeArray().push(newSize)
 
    console.log( getBackgroundSizeArray().map((size) => {
     return `${size[0]} ${size[1]}`;
    }).join(", "));
    
  createBackgroundSizeList(getBackgroundSizeArray())
  selected.style.backgroundSize = getBackgroundSizeArray().map((size) => {
   return `${size[0]} ${size[1]}`;
  }).join(", ");
 
  
});
