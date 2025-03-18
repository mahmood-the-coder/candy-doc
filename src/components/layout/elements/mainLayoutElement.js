import { bottomLayoutElement } from "./bottomLayoutElement.js";
import { centerLayoutElement } from "./centerLayoutElement.js";
import { leftSideLayoutElement } from "./leftSideLayoutElement.js";
import { rightSideLayoutElement } from "./rightSideLayoutElement.js";




export const mainLayoutElement = document.createElement("div");
mainLayoutElement.append( leftSideLayoutElement, rightSideLayoutElement, centerLayoutElement, bottomLayoutElement)
mainLayoutElement.classList.add("candyDoc__mainLayoutElement")






