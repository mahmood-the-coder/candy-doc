import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const fill = document.createElement("div");
fill.classList.add("candyDoc__icon","candyDoc__toggle");
fill.dataset.tooltip="fill"
fill.innerHTML =
  /*html*/
  `
  <svg
  fill="var(--color)"
  height="15px"
  width="15px"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 297 297"
  xml:space="preserve"
  stroke="var(--color)"
  strokeWidth="0.00297"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M289.5,0H7.5C3.358,0,0,3.357,0,7.5v282c0,4.143,3.358,7.5,7.5,7.5h282c4.143,0,7.5-3.357,7.5-7.5V7.5 C297,3.357,293.643,0,289.5,0z M109.653,282L282,109.654v62.831L172.485,282H109.653z M25.607,282L282,25.607v62.832L88.439,282 H25.607z M184.113,15L15,184.113v-62.832L121.281,15H184.113z M15,205.328L205.328,15h66.065L15,271.393V205.328z M100.067,15 L15,100.066V15H100.067z M193.7,282l88.3-88.3V282H193.7z"
    ></path>
  </g>
</svg>
`;
fill.addEventListener("mouseup", () => {
    const selectedElements = getSelectedElements()
    selectedElements.forEach(selected=>{
      const image = selected.querySelector("img");
      if (!image) return;
      image.style.objectFit = "fill";
    })

});