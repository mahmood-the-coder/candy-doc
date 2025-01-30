import { getSelected } from "../../selection/index.js";
import { bottom } from "./elements/bottom/index.js";
import { left } from "./elements/left/index.js";
import { right } from "./elements/right/index.js";
import { top } from "./elements/top/index.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorBorderWidthTools()
{
    return wrapper
}

window.addEventListener("mouseup",(e)=>{
    const selected=getSelected();
    if(!selected)return;
   
    
    if(selected.id!=e?.target?.parentElement?.id)return;
    if(!(selected instanceof Element))return;
    if(!(selected?.querySelector(".target") instanceof Element))return
    if(!(selected?.querySelector))return;
     top.querySelector("input").value=Math.ceil(getComputedStyle(selected.querySelector(".target")).borderTopWidth.replace("px",""));
     left.querySelector("input").value=Math.ceil(getComputedStyle(selected.querySelector(".target")).borderLeftWidth.replace("px",""));
     right.querySelector("input").value=Math.ceil(getComputedStyle(selected.querySelector(".target")).borderRightWidth.replace("px",""));
     bottom.querySelector("input").value=Math.ceil(getComputedStyle(selected.querySelector(".target")).borderBottomWidth.replace("px",""));

}) 