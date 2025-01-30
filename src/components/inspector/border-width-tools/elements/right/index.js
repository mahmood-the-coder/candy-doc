import { input } from "./input.js";
import { label } from "./label.js";

export const right=document.createElement("div");
right.classList.add("candyDoc__inspectorBorderWidthInput")
right.append(label,input);