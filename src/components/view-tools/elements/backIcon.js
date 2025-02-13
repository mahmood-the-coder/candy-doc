import {  getLayout} from "../../layout/index.js";
import { getPageActions } from "../../page-actions/index.js";

export const backIcon = document.createElement("div");
backIcon.classList.add("candyDoc__icon", "candyDoc__backIcon");
backIcon.innerHTML =
  /*html*/
  `
<svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
      stroke="var(--color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
      stroke="var(--color)"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M8.57 10.7701L7 9.19012L8.57 7.62012"
      stroke="var(--color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </g>
</svg>

`;
backIcon.addEventListener("mousedown", () => {
  getLayout().style.display = "grid"
  getPageActions().style.display = "flex"
  document.body.querySelectorAll(".candyDoc__viewToolWrapper").forEach(el => el.remove());
  document.body.querySelector(".candyDoc__viewPagesWrapper").remove();
  document.body.classList.remove("candyDoc__viewMode")
})
