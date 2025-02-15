import { isCollideY } from "../../collision/index.js";
import { renderHierarchy } from "../../hierarchy-items/index.js";
import { isInside } from "../../intersection/index.js";
import { userData } from "../../user-data/userData.js";
import { container } from "./container.js";
import { getHierarchyItems } from "./getHierarchyItems.js";
const dummy = document.createElement("div");
dummy.classList.add("candyDoc__hierarchyItemWrapper", "candyDoc__hierarchyDummy");
dummy.style.opacity = "0";
export function swap(clone, target, others) {
  const cloneRect = clone.getBoundingClientRect();
  others.forEach((o) => {
    const otherRect = o.getBoundingClientRect();

    if (isCollideY(otherRect, cloneRect)) {
      if (o.dataset.type != "parent") {
        if (
          cloneRect.y + cloneRect.height / 2 <
          otherRect.y + otherRect.height / 2
        ) {
          if (!target.contains(o.parentElement))
            o.parentElement.insertBefore(target, o);
        }

        if (
          cloneRect.y + cloneRect.height / 2 >
          otherRect.y + otherRect.height / 2
        ) {
          if (!target.contains(o.parentElement))
            o.parentElement.insertBefore(target, o.nextElementSibling);

        }
      }
      if (o.dataset?.type == "parent") {
        const targetItemIndex = userData.hierarchyItems.findIndex(
          (i) => i.id == target.dataset.id
        );
        if (userData.hierarchyItems[targetItemIndex])
          userData.hierarchyItems[targetItemIndex].parentId = null;
        const page = document.body.querySelector(
          `[data-page-id='${target.dataset.id}']`
        );

        if (page?.data?.parentId) {
          page.dataset.parentId = null;
          page.dataset.parentName = "none"

        }

        if (
          cloneRect.y + cloneRect.height / 2 <
          otherRect.y + cloneRect.height
        ) {
         
          o.parentElement.insertBefore(target, o);

          return;
        }

        if (
          cloneRect.y + cloneRect.height / 2 >
          otherRect.y + otherRect.height
        ) {
          o.parentElement.insertBefore(target, o.nextElementSibling);

        }

        const nest = o.querySelector(".nest");

        if (isInside(otherRect, cloneRect)) {
          nest.append(target);
          if (userData.hierarchyItems[targetItemIndex]) {
            userData.hierarchyItems[targetItemIndex].parentId = o.dataset.id;
          }

          const page = document.body.querySelector(
            `[data-page-id='${target.dataset.id}']`
          );
          if(page)
          {
            page.dataset.parentId = o.dataset.id;
            page.dataset.parentName = o.dataset.name
          }
          
        }
      }
      
    }
    
  });
  container.append(dummy);
  userData.hierarchyItems=getHierarchyItems(container)
}

