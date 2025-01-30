import { findAncestor } from "../find-ancestor/index.js";
import { editor } from "./elements/editor.js";
import { closeRunningFooter, openRunningFooter } from "./elements/toggle.js";
import { wrapper } from "./elements/wrapper.js";

export function getRunningFooterEditor()
{
    return wrapper
}

window.addEventListener("mousedown",(e)=>{
    
    
    if(
     !e.target.classList.contains("candyDoc__pageFooter") &&
     !findAncestor(e.target,"candyDoc__runningFooterEditor") &&
     !e.target.classList.contains("candyDoc__runningFooterEditor")&&
     !e.target.classList.contains("candyDoc__runningFooterWrapper") &&
     !findAncestor(e.target,"candyDoc__runningFooterWrapper") 
    ){
        editor?.remove()
        closeRunningFooter()
        return
    }
    const footer=findAncestor(e.target,"candyDoc__page").querySelector(".candyDoc__pageFooter");
    editor.style.height=footer.offsetHeight+"px"
    editor.style.width=footer.offsetWidth+"px"
    editor.style.left=footer.offsetLeft+"px"
    footer.parentElement.append(editor)
    openRunningFooter()
})