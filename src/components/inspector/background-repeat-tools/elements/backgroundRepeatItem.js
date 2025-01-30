import { getSelected } from "../../../selection/index.js";
import { createBackgroundRepeatList } from "./backgroundRepeatList.js";
import { getBackgroundRepeatArray } from "./getBackgroundRepeat.js";
export function createBackgroundRepeatItem(item, index) {
  const backgroundRepeatItem = document.createElement("div");
  backgroundRepeatItem.dataset.index = index.toString();
  backgroundRepeatItem.classList.add("candyDoc__inspectorBackgroundRepeatItem");
  const removeIcon = document.createElement("div");
  removeIcon.classList.add(
    "candyDoc__inspectorBackgroundRepeatItemRemove",
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
    const backgroundRepeat = getBackgroundRepeatArray();
    const index = parseInt(e.target.parentElement.dataset.index);
    backgroundRepeat.splice(index, 1);
    selected.style.backgroundRepeat = backgroundRepeat.join(", ");
    createBackgroundRepeatList(getBackgroundRepeatArray());
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
    "candyDoc__inspectorBackgroundRepeatItemDrag",
    "candyDoc__icon"
  );

  const repeat = document.createElement("select");

  const repeatOptions = [
    "repeat",
    "no-repeat",
    "repeat-x",
    "repeat-y",
    "space",
    "round",
  ];
  repeat.innerHTML = "";
  repeatOptions.forEach((op) => {
    const option = document.createElement("option");
    option.label = option.value = op;
    repeat.append(option);
  });
  repeat.value=item??"repeat";
  repeat.addEventListener("input",(e)=>{
    const selected = getSelected();
    if (!selected) return;
    const backgroundRepeat = getBackgroundRepeatArray();
    const index = parseInt(e.target.parentElement.dataset.index);
    backgroundRepeat[index]=e.target.value;
    console.log(backgroundRepeat);
    
    selected.style.backgroundRepeat = backgroundRepeat.join(", ");
    createBackgroundRepeatList(getBackgroundRepeatArray());
  })
  backgroundRepeatItem.append(dragIcon, repeat, removeIcon);
  return backgroundRepeatItem;
}
