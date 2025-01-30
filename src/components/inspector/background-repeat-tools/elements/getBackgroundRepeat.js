let backgroundRepeatArray = [];

export function getBackgroundRepeatArray() {
  return backgroundRepeatArray;
}
export function setBackgroundRepeatArray(newArray) {
  backgroundRepeatArray = newArray;
}

export function getBackgroundRepeat(target) {
  const backgroundRepeat = getComputedStyle(target).backgroundRepeat;


  if (backgroundRepeat == "none" || !backgroundRepeat || backgroundRepeat == "")
    return ["none"];
  return backgroundRepeat.split(", ")

}
