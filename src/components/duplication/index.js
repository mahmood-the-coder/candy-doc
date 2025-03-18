import { getSelectedElements } from "../selection/index.js"

export function initDuplication()
{
      window.addEventListener("keyup",(e)=>{
      
        
        if(e.ctrlKey && e.code=="KeyD")
        {
            const selectedElements=getSelectedElements()
            selectedElements.forEach(selected=>{
                const clone=selected.cloneNode(true);
                clone.id=Math.random(16)
                clone.classList.remove("selected")
                clone.style.left=selected.offsetLeft+20+"px"
                clone.style.top=selected.offsetTop+20+"px"
                selected.parentElement.append(clone);
            })
        }
    })
}