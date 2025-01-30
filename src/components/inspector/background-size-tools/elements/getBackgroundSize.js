let backgroundSizeArray = [];

export function getBackgroundSizeArray() {
  return backgroundSizeArray;
}
export function setBackgroundSizeArray(newArray) {
  backgroundSizeArray = newArray;
}

export function getBackgroundSize(target) {
  const imageSize = getComputedStyle(target).backgroundSize;

  if (imageSize == "none" || !imageSize || imageSize == "")
    return [["100%", "100%"]];
  return imageSize.split(", ").map((sizeString) => {
    return [...sizeString.split(" ")];
  });
}
