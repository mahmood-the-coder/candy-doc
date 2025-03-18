import { input } from "./input.js";
import { label } from "./label.js";

export const left=document.createElement("div");
left.classList.add("candyDoc__inspectorBorderWidthInput")
left.append(label,input);