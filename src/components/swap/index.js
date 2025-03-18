import { isCollideY } from "../collision/index.js";
export function swap(target, clone, others, deltaY) {
  const content = target.parentElement;
  if (!content) return;

  const cloneRect = clone.getBoundingClientRect();
  for (let index = 0; index < others.length; index++) {
    const other = others[index];
    const otherRect = other.getBoundingClientRect();

    if (isCollideY(cloneRect, otherRect)) {
      if (deltaY < 0) {
        content.insertBefore(other, target.nextElementSibling);
      } else if (deltaY > 0) {
        content.insertBefore(other, target);
      }
    }
  }
}
