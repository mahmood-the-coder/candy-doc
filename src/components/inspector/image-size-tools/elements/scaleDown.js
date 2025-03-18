import { getSelected, getSelectedElements } from "../../../selection/index.js";
export const scaleDown = document.createElement("div");
scaleDown.classList.add("candyDoc__icon", "candyDoc__toggle");
scaleDown.dataset.tooltip="scale-down"
scaleDown.innerHTML =
  /*html*/
  `
  <svg
  version="1.0"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  width="15px"
  height="15px"
  viewBox="0 0 64 64"
  enableBackground="new 0 0 64 64"
  xml:space="preserve"
  fill="var(--color)"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <polyline
      fill="none"
      stroke="var(--color)"
      strokeWidth="2"
      strokeMiterlimit="10"
      points="1,30 1,1 63,1 63,63 34,63 "
    ></polyline>
    <g>
      <g>
        <polyline
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="31,35 31,33 29,33 "
        ></polyline>
        <line
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeDasharray="4,2"
          x1="27"
          y1="33"
          x2="4"
          y2="33"
        ></line>
        <polyline
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="3,33 1,33 1,35 "
        ></polyline>
        <line
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeDasharray="4,2"
          x1="1"
          y1="37"
          x2="1"
          y2="60"
        ></line>
        <polyline
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="1,61 1,63 3,63 "
        ></polyline>
        <line
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeDasharray="4,2"
          x1="5"
          y1="63"
          x2="28"
          y2="63"
        ></line>
        <polyline
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="29,63 31,63 31,61 "
        ></polyline>
        <line
          fill="none"
          stroke="var(--color)"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeDasharray="4,2"
          x1="31"
          y1="59"
          x2="31"
          y2="36"
        ></line>
      </g>
    </g>
    <polyline
      fill="none"
      stroke="var(--color)"
      strokeWidth="2"
      stroke-linejoin="bevel"
      strokeMiterlimit="10"
      points="41,12 41,23 52,23 "
    ></polyline>
    <line
      fill="none"
      stroke="var(--color)"
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="41"
      y1="23"
      x2="57"
      y2="7"
    ></line>
  </g>
</svg>



`;
scaleDown.addEventListener("mouseup", () => {
  const selectedElements = getSelectedElements()
  selectedElements.forEach(selected => {
    const image = selected.querySelector("img");
    if (image)
      image.style.objectFit = "scale-down";
  })

});