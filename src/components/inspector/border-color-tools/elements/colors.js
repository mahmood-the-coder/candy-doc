export function getColor(target, border) {
  if(!(target instanceof Element))return;
  if (border == "left") {
    return getComputedStyle(target).borderLeftColor;
  }
  if (border == "right") {
    return getComputedStyle(target).borderRightColor;
  }
  if (border == "top") {
    return getComputedStyle(target).borderTopColor;
  }
  if (border == "bottom") {
    return getComputedStyle(target).borderBottomColor;
  }
}

export function rgbTOhex(rgb) {
  if (!rgb || rgb === "") return;

  // Clean up the input string and split it into components
  let colors = rgb
    .replace(/rgba?|\(|\)/g, "")
    .split(",")
    .map((c) => c.trim());

  // Extract RGB values and alpha (if present)
  const [r, g, b, a = 1] = colors;

  // Convert RGB and alpha values to hexadecimal
  const toHex = (value, scale = 1) => {
    const intValue = Math.round(parseFloat(value) * scale);
    const hex = intValue.toString(16).padStart(2, "0");
    return hex;
  };

  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);
  const alpha = toHex(a, 255);

  return `#${red}${green}${blue}${a < 1 ? alpha : ""}`; // Include alpha only if it's less than 1
}