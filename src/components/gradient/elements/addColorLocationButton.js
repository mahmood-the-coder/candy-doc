import { calculateGradient, getColors } from "./calGradient.js";
import { createColorLocation } from "./colorLocation.js";
import { gradientBar } from "./gradientBar.js";
import { getCurrentGradientType } from "./gradientType.js";
import { getCurrentDegree } from "./properties.js";
export const addColorLocationButton = document.createElement("div");
addColorLocationButton.classList.add(
  "candyDoc__icon",
  "candyDoc__addColorLocationButton"
);
addColorLocationButton.innerHTML =
  /*html*/
  `
<svg
  width="15px"
  height="15px"
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
      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
      stroke="var(--color)"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </g>
</svg>
`;

addColorLocationButton.addEventListener("mouseup", () => {
  const newColorLocation = createColorLocation();

  newColorLocation.style.left = `calc(100% - ${
    newColorLocation.offsetWidth 
  }px)`;
  gradientBar.append(newColorLocation);
  newColorLocation.innerText = gradientBar.children.length;
  gradientBar.style.backgroundImage = calculateGradient(
    getColors(),
    getCurrentGradientType(),
    getCurrentDegree()
  );

  
});

