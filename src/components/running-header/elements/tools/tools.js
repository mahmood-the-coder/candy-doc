import { actionTools } from "./actionTools.js";
import { addTools } from "./addTools.js";

export const tools=document.createElement("div");
tools.classList.add("candyDoc__runningHeaderToolsWrapperWrapper")
tools.append(addTools,actionTools)