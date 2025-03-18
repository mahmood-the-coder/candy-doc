import { toggleContainer } from "./input.js";
import { label } from "./label.js";

export const wrapper=document.createElement("div");
wrapper.append(label,toggleContainer)
wrapper.classList.add("candyDoc__editorUIToggleWrapper")