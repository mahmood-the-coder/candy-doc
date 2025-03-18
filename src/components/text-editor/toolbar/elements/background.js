import { createColorInput } from "../../../editor-UI/color/index.js";
export const background=createColorInput()

background.addEventListener("input",(e)=>{
    document.execCommand('backColor', false,e.target.value );
})