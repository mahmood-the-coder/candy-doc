import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const contain = document.createElement("div");
contain.classList.add("candyDoc__icon", "candyDoc__toggle");
contain.dataset.tooltip="contain"
contain.innerHTML =
  /*html*/
  `
<svg
  style="pointer-events: none"
  width="15px"
  height="15px"
  color="var(--color)"
  stroke="var(--color)"
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
    <defs></defs>
    <g id="roll_brush" data-name="roll brush">
      <rect class="cls-1" x="1.43" y="9.13" width="13.43" height="13.43"></rect>
      <polyline
        class="cls-1"
        points="14.85 22.55 10.06 14.88 7.08 19.66"
      ></polyline>
      <polygon
        class="cls-1"
        points="9.1 22.55 2.39 22.55 3.12 21.5 5.74 17.76 9.1 22.55"
      ></polygon>
      <circle class="cls-1" cx="5.74" cy="13.44" r="0.48"></circle>
      <line class="cls-1" x1="0.47" y1="1.45" x2="2.39" y2="1.45"></line>
      <line class="cls-1" x1="0.47" y1="5.29" x2="2.39" y2="5.29"></line>
      <line class="cls-1" x1="4.3" y1="1.45" x2="6.22" y2="1.45"></line>
      <line class="cls-1" x1="8.14" y1="1.45" x2="10.06" y2="1.45"></line>
      <line class="cls-1" x1="11.98" y1="1.45" x2="13.89" y2="1.45"></line>
      <line class="cls-1" x1="15.81" y1="1.45" x2="17.73" y2="1.45"></line>
      <line class="cls-1" x1="19.65" y1="1.45" x2="21.57" y2="1.45"></line>
      <line class="cls-1" x1="21.57" y1="3.37" x2="23.48" y2="3.37"></line>
      <line class="cls-1" x1="21.57" y1="7.21" x2="23.48" y2="7.21"></line>
      <line class="cls-1" x1="21.57" y1="11.05" x2="23.48" y2="11.05"></line>
      <line class="cls-1" x1="21.57" y1="14.88" x2="23.48" y2="14.88"></line>
      <line class="cls-1" x1="21.57" y1="18.72" x2="23.48" y2="18.72"></line>
      <line class="cls-1" x1="21.57" y1="22.55" x2="23.48" y2="22.55"></line>
      <line class="cls-1" x1="17.73" y1="22.55" x2="19.65" y2="22.55"></line>
    </g>
  </g>
</svg>
`;
contain.addEventListener("mouseup", () => {
  const selectedElements = getSelectedElements()

  selectedElements.forEach(selected => {
    const image = selected.querySelector("img");
    if (!image) return;
    image.style.objectFit = "contain";
  })

});