import { align } from "./align.js";
import { background } from "./background.js";
import { bold } from "./bold.js";
import { color } from "./color.js";
import { fonts } from "./fonts.js";
import { fontSize } from "./fontSize.js";
import { headers } from "./header.js";
import { italic } from "./italic.js";

export const wrapper=document.createElement("div");
wrapper.classList.add("candyDoc__textEditorToolbarWrapper")
wrapper.append(bold,italic,color,background,fontSize,fonts,align,headers)
wrapper.addEventListener("mouseup",(e)=>{
    e.stopPropagation()
})

wrapper.addEventListener("mousedown",(e)=>{
    e.preventDefault()
})