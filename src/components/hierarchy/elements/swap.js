import { isCollideY } from "../../collision/index.js";
import { isInside } from "../../intersection/index.js";
import { userData } from "../../user-data/userData.js";
import { container } from "./container.js";
const dummy = document.createElement("div");
dummy.classList.add("candyDoc__hierarchyItemWrapper","candyDoc__hierarchyDummy");
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
          o.parentElement.insertBefore(target, o);
        }

        if (
          cloneRect.y + cloneRect.height / 2 >
          otherRect.y + otherRect.height / 2
        ) {
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
        if(page?.data?.parentId)
        page.dataset.parentId = null;

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

        const nest = o.querySelector(".candyDoc__nestedHierarchyItems");

        if (
          nest.querySelectorAll(".candyDoc__hierarchyItemWrapper").length ==
            0 &&
          isInside(otherRect,cloneRect)
        ) {
          nest.append(target);
          nest
            .querySelectorAll(".candyDoc__hierarchyNestClose")
            .forEach((el) => (el.style.display = "block"));
          if (userData.hierarchyItems[targetItemIndex])
          {
            userData.hierarchyItems[targetItemIndex].parentId = o.dataset.id;

          }
         
          const page = document.body.querySelector(
            `[data-page-id='${target.dataset.id}']`
          );
          page.dataset.parentId = o.dataset.id;
        }
      }
    }
  });

  container.append(dummy);
}
