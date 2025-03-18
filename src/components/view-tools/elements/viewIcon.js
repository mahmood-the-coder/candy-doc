import { getLayout } from "../../layout/index.js";
import { getPageActions } from "../../page-actions/index.js";
import { createView } from "../../view/index.js";

export const viewIcon=document.createElement("div");
viewIcon.dataset.tooltip="View"
viewIcon.classList.add("candyDoc__icon","candyDoc__viewIcon");
viewIcon.addEventListener("mousedown",()=>{
    
    getLayout().style.display="none"
    getPageActions().style.display="none"
    createView()
})

viewIcon.innerHTML=/*html*/
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
    <circle cx="12" cy="12" r="3.5" stroke="var(--color)"></circle>
    <path
      d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
      stroke="var(--color)"
    ></path>
  </g>
</svg>
`