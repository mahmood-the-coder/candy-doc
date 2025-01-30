import { findAncestor } from "../find-ancestor/index.js";
import { getTemplateCols } from "./TableTemplate.js";
export function initTableColNames() {
  window.addEventListener("mousedown", (e) => {
    
    const table=findAncestor(e.target,"candyDoc__tableWrapper");
    if(!table)return;
    table.querySelectorAll(".candyDoc__tableColName").forEach(c=>c.remove())
    for (let index = 0; index < getTemplateCols(table).length; index++) {
  
      const colNameElement = document.createElement("div");
      colNameElement.dataset.nameCol = (index + 1).toString();
      colNameElement.innerText = String.fromCharCode(
        index + 1 + 96
      ).toUpperCase();
 

      colNameElement.style.bottom = `calc(100% + ${
        colNameElement.offsetHeight + 10
      }px)`;
      const left=getTemplateCols(table).map(t=>parseFloat(t.replace("px",""))).slice(0,index).reduce((v,a)=>{
        return v+a;
      },0)
      colNameElement.style.left =left+parseFloat(getTemplateCols(table)[index].replace("px",""))/2+"px"

      colNameElement.classList.add("candyDoc__tableColName","candyDoc__tableHandle");

      table.querySelector(".candyDoc__table").append(colNameElement);
    }
  });
}
