import { getSelected } from "../../selection/index.js";
export const clearButton = document.createElement("div");
clearButton.classList.add("candyDoc__gradientClear");
clearButton.innerText = "CLEAR";
clearButton.addEventListener("mousedown", () => {
  const selected = getSelected();
  if (!selected) return;

  selected.style.backgroundImage = selected.style.backgroundImage.split(
    "), "
  )[1]
    ? selected.style.backgroundImage.split("), ")[1]
    : "";
});

clearButton.innerHTML=/*html*/
`
<svg
  width="15px"
  height="15px"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="var(--color)"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      fill="none"
      stroke="var(--color)"
      stroke-width="2"
      d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M5,5 L19,19"
    ></path>
  </g>
</svg>

`