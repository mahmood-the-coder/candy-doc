import { isCollideY } from "../../../../collision/index.js";
import { getSelected } from "../../../../selection/index.js";

export function swap(clone, target, others) {
  const cloneRect = clone.getBoundingClientRect();



  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;

  for (let index = 0; index < others.length; index++) {
    const o = others[index];
    const otherRect = o.getBoundingClientRect();

    if (isCollideY(cloneRect, otherRect)) {
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
  }
}
