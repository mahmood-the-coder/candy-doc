import { createColorLocation } from "./colorLocation.js";

export const gradientBar = document.createElement("div");
gradientBar.classList.add("candyDoc__gradientBar");
const firstColorLocation = createColorLocation();
firstColorLocation.innerText = "1";
const lastColorLocation = createColorLocation();
firstColorLocation.style.left = "0%";
lastColorLocation.style.left = `calc(50% - ${
  lastColorLocation.offsetWidth / 2
}px)`;
lastColorLocation.innerText = "2";
gradientBar.append(firstColorLocation, lastColorLocation);
export function setGradientBarGradient(gradient) {
  gradientBar.style.backgroundImage = gradient;
}
