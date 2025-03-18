let currentColor = "#0065DD";
let currentColorLocation = null;

let currentDegree = 90;
export function getCurrentDegree() {
  return currentDegree;
}

export function setCurrentDegree(newDegree) {
  currentDegree = newDegree;
}

export function getCurrentColor() {
  return currentColor;
}

export function setCurrentColor(newColor) {
  currentColor = newColor;
}

export function getCurrentColorLocation() {
  return (
    currentColorLocation ||
    document.body.querySelector(".candyDoc__gradientColorLocation")
  );
}
export function setCurrentColorLocation(newColoLocation) {
  currentColorLocation = newColoLocation;
}