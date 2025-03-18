import { input } from "./input.js";
import { label } from "./label.js";

export const top=document.createElement("div");
top.classList.add("candyDoc__inspectorBorderColorInput")
top.append(label,input);