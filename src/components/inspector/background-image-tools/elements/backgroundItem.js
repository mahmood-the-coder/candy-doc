import { openFileModal } from "../../../file-modal/index.js";
import { openGradient } from "../../../gradient/index.js";
import { getSelected } from "../../../selection/index.js";
import {
  getBackgroundImageArray,
  setBackgroundImageArray
} from "./backgroundImage.js";
import { createBackgroundList } from "./backgroundList.js";

export function createBackgroundItem(backgroundImage) {
  const backgroundItem = document.createElement("div");
  backgroundItem.classList.add("candyDoc__inspectorBackgroundItem");
  const preview = document.createElement("div");
  preview.style.backgroundImage = backgroundImage ?? "none";
  preview.classList.add("candyDoc__inspectorBackgroundItemPreview", "preview");
  const removeIcon = document.createElement("div");
  removeIcon.classList.add(
    "candyDoc__inspectorBackgroundItemRemove",
    "candyDoc__icon"
  );
  removeIcon.innerHTML = /*html*/ `

<svg
  width="15px"
  height="15px"
  viewBox="0 0 16.00 16.00"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
  stroke="var(--color)"
  strokeWidth="0.00016"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill="var(--color)"
      d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"
    ></path>
  </g>
</svg>

`;
  removeIcon.addEventListener("mousedown", (e) => {
    const selected = getSelected();
    if (!selected) return;
    const backgroundImage = getBackgroundImageArray();
    const index = parseInt(e.target.parentElement.dataset.index);
    backgroundImage.splice(index, 1);
    selected.style.backgroundImage = backgroundImage.join(", ");
    createBackgroundList(getBackgroundImageArray());
  });
  const dragIcon = document.createElement("div");
  dragIcon.innerHTML =
    /*html*/
    `<svg
  width="15px"
  height="15px"
  viewBox="0 0 24.00 24.00"
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
    <g id="Interface / Drag_Vertical">
      <g id="Vector">
        <path
          d="M14 18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17C14.4477 17 14 17.4477 14 18Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14 6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5C14.4477 5 14 5.44772 14 6Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6Z"
          stroke="var(--color)"
          strokeWidth="0.744"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </g>
  </g>
</svg>
    `;
  dragIcon.classList.add(
    "candyDoc__inspectorBackgroundItemDrag",
    "candyDoc__icon"
  );

  const chooseImageIcon = document.createElement("div");
  chooseImageIcon.innerHTML =
    /*html*/
    `
  <svg 
    pointerEvents="none"
    xmlns="http://www.w3.org/2000/svg" 
    width="15px" 
    height="15px" 
    viewBox="0 0 512 512">
    <path 
    fill="var(--color)" 
    d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm323.8 106.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6l-26.5-33.1c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4S78.8 416 88 416h336c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7zM112 192a48 48 0 1 0 0-96a48 48 0 1 0 0 96" 
    />
  </svg>
`;
  chooseImageIcon.classList.add(
    "candyDoc__inspectorBackgroundItemChooseImage",
    "candyDoc__icon"
  );
  chooseImageIcon.addEventListener("mousedown", (e) => {
    const selected = getSelected();
    if (!selected) return;
    openFileModal((image) => {
      const selected = getSelected();
      if (!selected) return;
      const dataURL = image.querySelector("img").src;
      const index = parseInt(e.target.parentElement.dataset.index);
      getBackgroundImageArray()[index] = `url('${dataURL}')`;
      console.log(getBackgroundImageArray()[index]);

      selected.style.backgroundImage = getBackgroundImageArray().join(", ");
      preview.style.backgroundImage = getBackgroundImageArray()[index];
    });
  });

  const gradientIcon = document.createElement("div");
  gradientIcon.innerHTML =
    /*html*/
    `
  <svg
  fill="var(--color)"
  width="15px"
  height="15px"
  viewBox="0 0 32 32"
  id="icon"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <defs>
      <style>
        .cls-1 {
          fill: none;
        }
      </style>
    </defs>
    <path
      d="M26,4H6A2.0023,2.0023,0,0,0,4,6V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6A2.0023,2.0023,0,0,0,26,4ZM22,26V22H18v4H14V22H10V18h4V14H10V10h4V6h4v4h4V6h4V26Z"
    ></path>
    <rect x="14" y="10" width="4" height="4"></rect>
    <rect x="14" y="18" width="4" height="4"></rect>
    <rect x="18" y="14" width="4" height="4"></rect>
    <rect
      id="_Transparent_Rectangle_"
      class="cls-1"
      width="32"
      height="32"
    ></rect>
  </g>
</svg>

`;
  gradientIcon.classList.add(
    "candyDoc__inspectorBackgroundImageGradient",
    "candyDoc__icon"
  );
  gradientIcon.addEventListener("mousedown", (e) => {
    openGradient((gradient) => {
      const selected = getSelected();
      if (!selected) return;
      const backgroundImage =getBackgroundImageArray();
      const index = parseInt(e.target.parentElement.dataset.index);
  
      
      backgroundImage[index] = gradient;
      
      selected.style.backgroundImage = backgroundImage.join(", ");
      preview.style.backgroundImage = backgroundImage[index];
      setBackgroundImageArray(backgroundImage)
      
    });
  });

  backgroundItem.append(
    removeIcon,
    chooseImageIcon,
    gradientIcon,
    dragIcon,
    preview
  );
  return backgroundItem;
}
