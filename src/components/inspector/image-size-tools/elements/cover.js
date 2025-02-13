import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const cover = document.createElement("div");
cover.classList.add("candyDoc__icon","candyDoc__toggle");
cover.dataset.tooltip="cover"
cover.innerHTML =
  /*html*/
  `
  <svg
  width="15px"
  height="15px"
  viewBox="0 0 48 48"
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
    <rect
      x="14"
      y="14"
      width="20"
      height="20"
      stroke="var(--color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></rect>
    <path
      d="M34 23L23 34"
      stroke="var(--color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M25 14L14 25"
      stroke="var(--color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M34 14L14 34"
      stroke="var(--color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <rect
      x="6"
      y="6"
      width="36"
      height="36"
      rx="3"
      stroke="var(--color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></rect>
  </g>
</svg>



`;
cover.addEventListener("mouseup", () => {
    const selectedElements = getSelectedElements()
    selectedElements.forEach(selected=>{
      const image = selected.querySelector("img");
      if (image)
          image.style.objectFit = "cover";
    })

});