let backgroundImageArray = [];
export function getBackgroundImageArray() {
  return backgroundImageArray;
}
export function setBackgroundImageArray(newArray) {
  backgroundImageArray = newArray;
}
export function getBackgroundImage(target) {
  return parseBackgroundImage(getComputedStyle(target).backgroundImage);
}
function parseBackgroundImage(backgroundImage) {
  let parts = backgroundImage.split(/\), +/);
  
  
  return parts.map(p=>p.trim()).filter(p=>p!="").filter(p=>p!="none");
}
