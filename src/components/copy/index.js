import { findAncestor } from "../find-ancestor/index.js"
import { getSelectedElements } from "../selection/index.js";

export function initCopy()
{
    let toCopy=[]
    let toCut=[]

    window.addEventListener("copy",(e)=>{
        toCopy=[]
        
        if(findAncestor(e.target,"candyDoc__textBoxWrapper"))return;
        const selectedElements=getSelectedElements();
        selectedElements.forEach(selected=>{
            toCopy.push(selected.cloneNode(true));
          
        })

    })

    window.addEventListener("cut",(e)=>{
        
        toCut=[]
        const selectedElements=getSelectedElements();
        selectedElements.forEach(selected=>{
            toCut.push(selected);
           
        })

    })

    window.addEventListener("paste",(e)=>{
        
        if(findAncestor(e.target,"candyDoc__textBoxWrapper"))return;
        const cursor=document.body.querySelector(".candyDoc__cursor");
      
        toCopy.forEach(c=>{
            c.id=Math.random(16)
            cursor.parentElement.append(c)
        })
        toCut.forEach(c=>{
            c.id=Math.random(16)
            cursor.parentElement.append(c)
          
        })
        
    })
}