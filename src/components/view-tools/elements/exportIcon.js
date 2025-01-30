import { getExportsOptions } from "../../export/index.js";

export const exportIcon = document.createElement("div");
exportIcon.classList.add("candyDoc__icon", "candyDoc__exportIcon");
exportIcon.innerHTML =
  /*html*/
  `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--color)">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M12 18V3.707L9.354 6.354l-.707-.707L12.5 1.793l3.854 3.854-.707.707L13 3.707V18zm5-2h4v5H4v-5h4v-1H3v7h19v-7h-5z"
    ></path>
    <path fill="none" d="M0 0h24v24H0z"></path>
  </g>
</svg>

`;

exportIcon.addEventListener("mouseup", () => {
  toggleExportOptions();
});

function toggleExportOptions() {
  const exportOptions = getExportsOptions();
   console.log(exportOptions.style.display);
   
  let display=exportOptions?.style?.display??"none"
  if(display=="")display="none"
  exportOptions.style.display =
    display== "none" ? "flex" : "none";
}
