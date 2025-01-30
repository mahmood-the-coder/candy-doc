import { getCenterLayoutElement } from "../../layout/index.js";
import { getSelected } from "../../selection/index.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorTextMargin()
{
    return wrapper;
}

window.addEventListener("mouseup",(e)=>{
    if(!getCenterLayoutElement().contains(e.target))return;
    const selected=getSelected();
    if(!selected)return;
    if(!selected.classList.contains("candyDoc__textBlockWrapper"))return;
    const target=selected.querySelector(".target");
    const inputs= wrapper.querySelectorAll("input");
    inputs[0].value=parseInt(getComputedStyle(target).marginBottom.replace("px",""));
    inputs[1].value=parseInt(getComputedStyle(target).marginTop.replace("px",""));
})