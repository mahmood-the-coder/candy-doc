import { imagePlaceHolder } from "../../../base64/base64.js";
import { getSelected } from "../../../selection/index.js";
import { getBackgroundImageArray, setBackgroundImageArray } from "./backgroundImage.js";
import { createBackgroundItem } from "./backgroundItem.js";

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
addItemIcon.classList.add(
  "candyDoc__icon",
  "candyDoc__inspectorBackgroundAddIcon"
);
export function createBackgroundList(items) {
  backgroundList.innerHTML = "";
  backgroundList.append(addItemIcon);
  items.forEach((item, index) => {
    const backgroundImageElement = createBackgroundItem(item);
    backgroundImageElement.dataset.index = index.toString();
    backgroundList.append(backgroundImageElement);
  });
  return backgroundList;
}

const backgroundList = document.createElement("div");
backgroundList.classList.add("candyDoc__inspectorBackgroundList");

addItemIcon.addEventListener("mousedown", (e) => {
  const selected = getSelected();
  if(!selected)return;
  const backgroundImage=getBackgroundImageArray();
  backgroundImage.push(imagePlaceHolder);
  createBackgroundList(backgroundImage);
  setBackgroundImageArray(backgroundImage);

  
  selected.style.backgroundImage = backgroundImage.join(", ")
  console.log(backgroundImage.join(", "))
  
});
