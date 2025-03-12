import { isCollideY } from "../../collision/index.js";
import { numberPages } from "../../pages/elements/numberPages.js";
import { isInside } from "../../intersection/index.js";
import { userData } from "../../user-data/userData.js";
import { hierarchyContainer } from "./container.js";
import { getHierarchyItems } from "./getHierarchyItems.js";
import { generateTableOfContent } from "../../table-of-content/index.js";
import { createPages } from "../../pages/index.js";
const dummy = document.createElement("div");
dummy.classList.add("candyDoc__hierarchyItemWrapper", "candyDoc__hierarchyDummy");
dummy.style.opacity = "0";
dummy.style.height = "1px"
export function swap(clone, target, others) {
  const cloneRect = clone.getBoundingClientRect();
  const pageWrapper = document.body.querySelector(".candyDoc__pagesWrapper");
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


        const page = pageWrapper.querySelector(`[data-page-id='${target.dataset.id}']`)
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
            const page = pageWrapper.querySelector(`[data-page-id='${target.dataset.id}']`)
            if (page) {
              page.dataset.parentId = o.dataset.id
              page.dataset.parentName = o.querySelector("input").value

            }
          }



        }
      }

    }

  });

  hierarchyContainer.append(dummy);

}

