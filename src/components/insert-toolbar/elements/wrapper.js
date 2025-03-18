import { chartIcon } from "./chartIcon.js";
import { diagramIcon } from "./diagramIcon.js";
import { imageIcon } from "./imageIcon.js";
import { orderedList } from "./orderedList.js";
import { shapes } from "./shapeIcon.js";
import { tableIcon } from "./tableIcon.js";
import { textBox } from "./textBox.js";
import { unorderedList } from "./unorderedList.js";

export const wrapper = document.createElement("div");
wrapper.classList.add("candyDoc__insertToolsWrapper");
wrapper.append(textBox,orderedList,unorderedList, imageIcon, tableIcon, chartIcon, diagramIcon,shapes);
