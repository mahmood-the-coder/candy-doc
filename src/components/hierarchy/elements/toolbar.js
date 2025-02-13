import { addChapterIcon } from "./addChapterIcon.js";
import { addPageIcon } from "./addPageIcon.js";
import { tableOfContentIcon } from "./generateTableOfContentIcon.js";
export const toolbar = document.createElement("div");
toolbar.classList.add("candyDoc__hierarchyToolbar");


toolbar.append(addChapterIcon,addPageIcon,tableOfContentIcon);

