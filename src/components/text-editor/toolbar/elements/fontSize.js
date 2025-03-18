import { getNumberInput } from "../../../editor-UI/number/index.js";

export const fontSize=getNumberInput("Font Size",true,3,1,7,1,(value)=>{
    document.execCommand("fontSize", false, value); // 1-7 scale (not px)
    console.log(value);
})


fontSize.querySelector("input").addEventListener("input",(e)=>{
   
    

})