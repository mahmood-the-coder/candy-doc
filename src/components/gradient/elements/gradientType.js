import { getSelected } from "../../selection/index.js";
let currentGradientType = "linear-gradient";
 const radialType = document.createElement("div");
radialType.classList.add("candyDoc__icon", "candyDoc__radialType");
radialType.innerHTML =
  /*html*/
  `
<svg
  pointerEvents="none"
  width="20px"
  height="20px"
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
    <path
      fill="none"
      stroke="var(--color)"
      strokeWidth="2"
      d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M12,17 C14.7614237,17 17,14.7614237 17,12 C17,9.23857625 14.7614237,7 12,7 C9.23857625,7 7,9.23857625 7,12 C7,14.7614237 9.23857625,17 12,17 Z"
    ></path>
  </g>
</svg>

`;

 const linearType = document.createElement("div");
linearType.classList.add("candyDoc__icon", "candyDoc__linearType");
linearType.style.opacity = "1";
linearType.style.scale = "1.1";
linearType.innerHTML =
  /*html*/
  `
<svg
  pointerEvents="none"
  width="25px"
  height="25px"
  viewBox="0 0 24 24"
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
    <path
      d="M3.03509 12.9431C3.24245 14.9227 4.10472 16.8468 5.62188 18.364C7.13904 19.8811 9.0631 20.7434 11.0428 20.9508L3.03509 12.9431Z"
      fill="var(--color)"
    ></path>
    <path
      d="M3 11.4938L12.4921 20.9858C13.2976 20.9407 14.0981 20.7879 14.8704 20.5273L3.4585 9.11548C3.19793 9.88771 3.0451 10.6883 3 11.4938Z"
      fill="var(--color)"
    ></path>
    <path
      d="M3.86722 8.10999L15.8758 20.1186C16.4988 19.8201 17.0946 19.4458 17.6493 18.9956L4.99021 6.33659C4.54006 6.89125 4.16573 7.487 3.86722 8.10999Z"
      fill="var(--color)"
    ></path>
    <path
      d="M5.66301 5.59517C9.18091 2.12137 14.8488 2.135 18.3498 5.63604C21.8508 9.13708 21.8645 14.8049 18.3907 18.3228L5.66301 5.59517Z"
      fill="var(--color)"
    ></path>
  </g>
</svg>

`;

linearType.addEventListener("mousedown", () => {
  turnLinearOn();
  currentGradientType = "linear-gradient";
  const selected = getSelected();
  
});
radialType.addEventListener("mousedown", () => {
  turnRadialOn();
  currentGradientType = "radial-gradient";
 
});

export function turnRadialOn() {
  linearType.style.opacity = "0.5";
  radialType.style.opacity = "1";
  radialType.style.scale = "1.1";
  linearType.style.scale = "1";
}

export function turnLinearOn() {
  radialType.style.opacity = "0.5";
  linearType.style.opacity = "1";
  linearType.style.scale = "1.1";
  radialType.style.scale = "1";
}

export function getCurrentGradientType() {
  return currentGradientType;
}

window.addEventListener("mouseup", (e) => {
  const selected = getSelected();
  if (!selected) return;
  if (e.target?.parentElement?.id != selected.id) return;

  if (getComputedStyle(selected).backgroundImage == "none") {
    radialType.style.opacity = "0.5";
    linearType.style.opacity = "1";
    linearType.style.scale = "1.1";
    radialType.style.scale = "1";
    currentGradientType = "linear-gradient";
    return;
  }
});

export const gradientType=document.createElement("div");
gradientType.classList.add("candyDoc__gradientTypeWrapper")
gradientType.append(radialType,linearType)