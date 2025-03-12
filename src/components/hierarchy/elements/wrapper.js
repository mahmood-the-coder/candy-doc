import { hierarchyContainer } from "./container.js";
import { title } from "./documentTitle.js";
import { toolbar } from "./toolbar.js";

export const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__hierarchyWrapper");
wrapper.id = "candy-doc-hierarchy"

wrapper.append(title,toolbar,hierarchyContainer)




