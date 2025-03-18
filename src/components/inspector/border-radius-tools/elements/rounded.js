import { getSelectedElements } from "../../../selection/index.js";
export const rounded=document.createElement("div");
rounded.classList.add("candyDoc__icon","candyDoc__toggle");
rounded.innerHTML=/*html*/
`
<svg
  style="pointer-events: none"
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path fill="none" d="M0 0H24V24H0z"></path>
      <path
        d="M21 19v2h-2v-2h2zm-4 0v2h-2v-2h2zm-4 0v2h-2v-2h2zm-4 0v2H7v-2h2zm-4 0v2H3v-2h2zm16-4v2h-2v-2h2zM5 15v2H3v-2h2zm0-4v2H3v-2h2zm11-8c2.687 0 4.882 2.124 4.995 4.783L21 8v5h-2V8c0-1.591-1.255-2.903-2.824-2.995L16 5h-5V3h5zM5 7v2H3V7h2zm0-4v2H3V3h2zm4 0v2H7V3h2z"
      ></path>
    </g>
  </g>
</svg>


`
rounded.addEventListener("mouseup", () => {
   const selectedElements = getSelectedElements()
       selectedElements.forEach(selected=>{
         selected.querySelector(".target").style.borderRadius = "16px"
   
       })
})