import { image } from "./image.js";

export const wrapper = document.createElement("div");
wrapper.classList.add(
  "candyDoc__imageWrapper",
  "resizable",
  "full-resize",
  "draggable",
  "removable",
  "selectable",
  "rotatable"
);

wrapper.append(image)