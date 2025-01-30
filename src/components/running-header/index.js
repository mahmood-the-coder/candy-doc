import { wrapper } from "./elements/wrapper.js";
import { findAncestor } from "../find-ancestor/index.js";
import { openRunningHeader, closeRunningHeader } from "./elements/toggle.js";
import { editor } from "./elements/editor.js";
export function getRunningHeaderEditor()
{
    return wrapper
}
window.addEventListener("mousedown",(e)=>{
    
    
    if(
     !e.target.classList.contains("candyDoc__pageHeader") &&
     !findAncestor(e.target,"candyDoc__runningHeaderEditor") &&
     !e.target.classList.contains("candyDoc__runningHeaderEditor")&&
     !e.target.classList.contains("candyDoc__runningHeaderWrapper") &&
     !findAncestor(e.target,"candyDoc__runningHeaderWrapper") 
    ){
        editor?.remove()
        closeRunningHeader()
        return
    }
    const header=findAncestor(e.target,"candyDoc__page").querySelector(".candyDoc__pageHeader");
    editor.style.height=header.offsetHeight+"px"
    editor.style.width=header.offsetWidth+"px"
    editor.style.left=header.offsetLeft+"px"
    header.parentElement.append(editor)
    openRunningHeader()
})