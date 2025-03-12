import { createHierarchyItemElement } from "../hierarchy-item-element/index.js";
import { hierarchyContainer } from "../hierarchy/elements/container.js";




export function renderHierarchy(items) {
  hierarchyContainer.innerHTML = "";
  items.forEach((item) => {
    const clone = createHierarchyItemElement(item);
    const nest = clone.querySelector(".nest");
    items
      .filter((i) => i?.parentId == item.id)
      .forEach((c,index) => {
        const nested = createHierarchyItemElement(c);
        nested.dataset.parentName=item.parentName;
        nested.dataset.relativeNumber=index+1
        nest.append(nested);
        if (c.selected == "true") {
          nested.style.outline = "2px solid var(--color)"
        }
      });
    
    if (item.selected == "true") {
      clone.style.outline = "2px solid var(--color)"
    }
    if (clone.dataset.type == "page") {
      clone.querySelector(".nest").remove()
    }
    if(item.type=="parent")
    {
      clone.classList.add("candyDoc__hierarchyChapter")
      const color=item?.color??"white"
      
      clone.querySelectorAll(".candyDoc__hierarchyItemWrapper:not([data-type='page'])").forEach(el=>{
        el.style.backgroundColor=color
      })
      clone.style.backgroundColor=color
      clone.dataset.color=color
      
    }
    if (!item.parentId) hierarchyContainer.append(clone);
  });

  


}


