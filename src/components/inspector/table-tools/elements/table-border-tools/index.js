import { getSelected } from "../../../../selection/index.js";
import { bottom } from "./elements/bottom.js";
import { left } from "./elements/left.js";
import { right } from "./elements/right.js";
import { top } from "./elements/top.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorTableBorderTools() {

  return wrapper;
}

window.addEventListener("mouseup", (e) => {
    const selected = getSelected();

    if (!selected) return ;
    
   if(selected.querySelectorAll!="function")return;
   const cells=[...selected.querySelectorAll(".candyDoc__tableCell")]
   cells.forEach(c=>{
    
    console.log(window.getComputedStyle(c).borderTop);
    
    if (window.getComputedStyle(c).borderTop == "0.8px solid rgb(0, 0, 0)") {
      top.classList.add("candyDoc__activeIcon");
    } else {
      top.classList.remove("candyDoc__activeIcon");
    }
    if (
      window.getComputedStyle(c).borderBottom == "0.8px solid rgb(0, 0, 0)"
    ) {
      bottom.classList.add("candyDoc__activeIcon");
    } else {
      bottom.classList.remove("candyDoc__activeIcon");
    }
    if (window.getComputedStyle(c).borderLeft == "0.8px solid rgb(0, 0, 0)") {
      left.classList.add("candyDoc__activeIcon");
    } else {
      left.classList.remove("candyDoc__activeIcon");
    }
    if (
      window.getComputedStyle(c).borderRight == "0.8px solid rgb(0, 0, 0)"
    ) {
      right.classList.add("candyDoc__activeIcon");
    } else {
      right.classList.remove("candyDoc__activeIcon");
    }
   })

});
