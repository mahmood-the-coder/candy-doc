import { list } from "./list.js";

export const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__orderedListWrapper","selectable","resizable","draggable","removable")
wrapper.append(list)