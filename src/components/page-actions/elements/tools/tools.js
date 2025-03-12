import { applyAll } from "../actions/applyAll.js";
import { applyChapter } from "../actions/applyChapter.js";

export const tools=document.createElement("div");
tools.classList.add("candyDoc__pageActionsTools");
tools.append(applyAll,applyChapter)