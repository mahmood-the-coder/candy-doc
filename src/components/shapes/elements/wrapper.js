import { SVG } from "./SVG.js";

export  const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__shapeWrapper","selectable","draggable","removable","resizable")
wrapper.append(SVG);