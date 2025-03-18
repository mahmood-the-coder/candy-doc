import { findAncestor } from "../find-ancestor/index.js";
import { getTemplateRows } from "./TableTemplate.js";
export function initTableRowNames() {
   
    window.addEventListener("mousedown",(e)=>{
        const table=findAncestor(e.target,"candyDoc__tableWrapper");
        if(!table)return;
        table.querySelectorAll(".candyDoc__tableRowName").forEach(c=>c.remove())

        for (let index = 0; index <  getTemplateRows(table).length; index++) {;
            const rowNameElement = document.createElement("div");
            rowNameElement.innerText = (index + 1).toString();
            rowNameElement.dataset.rowName = (index + 1).toString();
            rowNameElement.classList.add("candyDoc__tableRowName","candyDoc__tableHandle");
            
            rowNameElement.style.top=getTemplateRows(table).map(t=>parseFloat(t.replace("px",""))).slice(0,index).reduce((v,a)=>{
                return v+a;
            },0)+parseFloat(getTemplateRows(table)[index].replace("px",""))/2+"px"
            table.querySelector(".candyDoc__table").append(rowNameElement);
        }
    })
    
 
   
}

