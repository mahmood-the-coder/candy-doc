import { gradientBar } from "./gradientBar.js";

export function calculateGradient(
  colors = [],
  type = "linear-gradient",
  degree = "90"
) {
  
  return `${type}(${degree && type=="linear-gradient" ? degree + "deg, " : ""}${colors.join(", ")})`;
}

export function getColors() {
  const colorsElements = gradientBar.querySelectorAll(".candyDoc__gradientColorLocation");
  const colors = [];
  colorsElements.forEach((el) => {
    
    
    const percent = (el.offsetLeft * 100) / gradientBar.offsetWidth;
  
    
    colors.push(
      `${window.getComputedStyle(el).backgroundColor} ${Math.round(percent)}%`
    );
  });

  return colors;
}
