import { input } from "./input.js";
import { label } from "./label.js";

export const bottom=document.createElement("div");
bottom.classList.add("candyDoc__inspectorBorderColorInput")
bottom.append(label,input);