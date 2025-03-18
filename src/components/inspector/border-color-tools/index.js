import { getSelected, getSelectedElements } from "../../selection/index.js";
import { getInspector } from "../index.js";
import { bottom } from "./elements/bottom/index.js";
import { getColor, rgbTOhex } from "./elements/colors.js";
import { left } from "./elements/left/index.js";
import { right } from "./elements/right/index.js";
import { top } from "./elements/top/index.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorBorderColorTools()
{
    return wrapper
}

window.addEventListener("mouseup",(e)=>{
    if(getInspector().contains(e.target))return;
    const selectedElements=getSelectedElements()
    const selected=selectedElements[selectedElements.length-1];
    if(!selected)return;
    
    if(!(selected?.querySelector))return;
    top.querySelector("input").value=rgbTOhex(getColor(selected.querySelector(".target"),"top"))
    top.querySelector("input").style.color=rgbTOhex(getColor(selected.querySelector(".target"),"top"))
    top.querySelector("input").style.backgroundColor=rgbTOhex(getColor(selected.querySelector(".target"),"top"))
    
    bottom.querySelector("input").value=rgbTOhex(getColor(selected.querySelector(".target"),"bottom"))
    bottom.querySelector("input").style.color=rgbTOhex(getColor(selected.querySelector(".target"),"bottom"))
    bottom.querySelector("input").style.backgroundColor=rgbTOhex(getColor(selected.querySelector(".target"),"bottom"))
    
    left.querySelector("input").value=rgbTOhex(getColor(selected.querySelector(".target"),"left"))
    left.querySelector("input").style.color=rgbTOhex(getColor(selected.querySelector(".target"),"left"))
    left.querySelector("input").style.backgroundColor=rgbTOhex(getColor(selected.querySelector(".target"),"left"))

    right.querySelector("input").value=rgbTOhex(getColor(selected.querySelector(".target"),"right"))
    right.querySelector("input").style.color=rgbTOhex(getColor(selected.querySelector(".target"),"right"))
    right.querySelector("input").style.backgroundColor=rgbTOhex(getColor(selected.querySelector(".target"),"right"))
})