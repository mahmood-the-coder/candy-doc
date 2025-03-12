import { isCollideY } from "../../../collision/index.js";
import { getPagesItems } from "./pagesTools.js";

export function swap(clone, target, others) {
 const cloneRect = clone.getBoundingClientRect();



 const pagesItems=getPagesItems()

  
 
  
  for (let index = 0; index < others.length; index++) {
    const o = others[index];
    const otherRect = o.getBoundingClientRect();
    
    if (isCollideY(cloneRect, otherRect)) {
      if (
        cloneRect.y + cloneRect.height / 2 <
        otherRect.y + otherRect.height / 2
      ) {
        const temp=pagesItems[target.dataset.index];
        pagesItems[target.dataset.index]=pagesItems[o.dataset.index];
        pagesItems[o.dataset.index]=temp;
        const targetIndex=target.dataset.index;
        target.dataset.index=o.dataset.index;
        o.dataset.index=targetIndex;
        o.parentElement.insertBefore(target, o);
      
      }

      if (
        cloneRect.y + cloneRect.height / 2 >
        otherRect.y + otherRect.height / 2
      ) {
        const temp=pagesItems[o.dataset.index];
        pagesItems[o.dataset.index]=pagesItems[target.dataset.index];
        pagesItems[target.dataset.index]=temp;
      

        const otherIndex=o.dataset.index;
        o.dataset.index=target.dataset.index;
        target.dataset.index=otherIndex
       
        o.parentElement.insertBefore(target, o.nextElementSibling);
       
      }
    }
  }

}
