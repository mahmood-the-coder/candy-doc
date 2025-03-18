import { insertChart } from "../../chart/index.js";

export const chartIcon = document.createElement("div");
chartIcon.dataset.tooltip="Chart"
chartIcon.classList.add("candyDoc__icon","insertChart");
chartIcon.innerHTML =
  /*html*/
  `
<svg
  pointerEvents="none"
  color='var(--color)'   
  width="15px" 
  height="15px" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth="0">
  </g>
  <g id="SVGRepo_tracerCarrier"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
  </g>
  <g id="SVGRepo_iconCarrier"> 
    <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M15 4V8M11 8V12M7 13V17M19 4V17"
    stroke="var(--color)" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    </path>
  </g>
</svg>
`;

window.addEventListener("mousedown",(e)=>{
  if(!e.target.classList.contains("insertChart"))return;
  insertChart()
})