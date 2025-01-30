import { input } from "./input.js";
import { label } from "./label.js";

export const top=document.createElement("div");
top.classList.add("candyDoc__inspectorBorderWidthInput")
top.append(label,input);