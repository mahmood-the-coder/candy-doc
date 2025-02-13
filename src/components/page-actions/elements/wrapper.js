import { toggle } from "./toggle.js";
import { tools } from "./tools/tools.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__pageActionsWrapper");
wrapper.append(tools,toggle);
