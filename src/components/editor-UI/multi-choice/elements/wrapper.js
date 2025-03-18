import { choicesList } from "./choicesList.js";
import { label } from "./label.js";

export const wrapper=document.createElement("div");
wrapper.append(label,choicesList)
wrapper.classList.add("candyDoc__editorUIMultiChoiceWrapper")