import { textBox } from "./textBox.js";

export const textBoxWrapper = document.createElement("div");
textBoxWrapper.classList.add(
  "candyDoc__textBoxWrapper",
  "resizable",
  "draggable",
  "removable",
  "selectable",
  "rotatable",
  
);

textBoxWrapper.append(textBox);
