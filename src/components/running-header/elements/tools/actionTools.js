import { applyAll } from "../actions/applyAll.js";
import { applyChapter } from "../actions/applyChapter.js";
import { applyPage } from "../actions/applyPage.js";

export const actionTools=document.createElement("div");
actionTools.classList.add("candyDoc__runningHeaderActionTools","candyDoc__runningHeaderToolsWrapper");
actionTools.append(applyAll,applyChapter,applyPage)