import { searchInput } from "../inspector-search/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { header } from "./elements/header.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspector() {
  return wrapper;
}

export function getInspectorHeader() {
  header.append(searchInput)
  return header;
}


wrapper.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("candyDoc__toggle")) {
     wrapper.querySelectorAll(".candyDoc__toggleIcon").forEach(i=>{
      i.classList.remove("candyDoc__toggleIcon")
     })
    e.target.classList.add("candyDoc__toggleIcon");
   
  }
});
wrapper.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("candyDoc__active")) {
    e.target.classList.toggle("candyDoc__activeIcon");
    
  }
 
});

getCenterLayoutElement().addEventListener("mousedown",(e)=>{
  
  
   if(e.target.classList.contains("selectable") || findAncestor(e.target,"selectable") )return;
   getInspector().innerHTML=""
})

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}
