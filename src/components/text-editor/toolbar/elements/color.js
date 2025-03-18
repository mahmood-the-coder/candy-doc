import { createColorInput } from "../../../editor-UI/color/index.js";
export const color=createColorInput()

color.addEventListener("input",(e)=>{
    document.execCommand('foreColor', false,e.target.value );
})