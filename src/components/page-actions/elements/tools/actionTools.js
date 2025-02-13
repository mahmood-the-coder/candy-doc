import { applyAll } from "../actions/applyAll.js";
import { applyChapter } from "../actions/applyChapter.js";

export const actionTools=document.createElement("div");
actionTools.classList.add("candyDoc__pageActionsTools");
actionTools.append(applyAll,applyChapter)