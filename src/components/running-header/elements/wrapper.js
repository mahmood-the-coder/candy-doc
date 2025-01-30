import { editor } from "./editor.js";
import { toggle, toggleWrapper } from "./toggle.js";
import { tools } from "./tools/tools.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__runningHeaderWrapper","candyDoc__runningWrapper");
const editorWrapper=document.createElement("div");
editorWrapper.classList.add("candyDoc__runningHeaderEditorWrapper")
toggleWrapper.append(tools);
wrapper.append(toggleWrapper,toggle);
