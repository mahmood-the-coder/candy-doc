import { findAncestor } from "../../find-ancestor/index.js";
import { getRange } from "../../range/index.js";

export const list=document.createElement("ol");
list.contentEditable="true";
list.classList.add("candyDoc__orderedList","target");
const li=document.createElement("li");
list.append(li);
li.innerText="__"

window.addEventListener("keydown",(e)=>{
    const range=getRange();
    if(!range)return;
    if(e.code=="Tab" && findAncestor(range.startContainer,"candyDoc__orderedList"))
    {
        const list=document.createElement("ol")
        list.classList.add("candyDoc__nestedList");
        const li=document.createElement("li");
        li.innerText="__"
        list.append(li)
        range.insertNode(list);
        setTimeout(() => {
            window.getSelection().selectAllChildren(li)
        }, 10);
        
    }
    
})