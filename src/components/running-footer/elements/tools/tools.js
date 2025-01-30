import { actionTools } from "./actionTools.js";
import { addTools } from "./addTools.js";

export const tools=document.createElement("div");
tools.classList.add("candyDoc__runningFooterToolsWrapperWrapper")
tools.append(addTools,actionTools)