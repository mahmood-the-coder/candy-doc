import { input } from "./input.js";
import { label } from "./label.js";

export const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__editorUINumberWrapper");
wrapper.append(label,input);