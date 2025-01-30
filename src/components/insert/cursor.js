import { findAncestor } from "../find-ancestor/index.js";
import { bottom } from "../guide/elements/bottom.js";
import { centerHorizontal } from "../guide/elements/centerHorizontal.js";
import { centerVertical } from "../guide/elements/centerVertical.js";
import { left } from "../guide/elements/left.js";
import { right } from "../guide/elements/right.js";
import { top } from "../guide/elements/top.js";
import { getInsertTools } from "../insert-toolbar/index.js";
export const cursor = document.createElement("div");
cursor.classList.add("candyDoc__cursor");
const center = document.createElement("div");
cursor.append(center);
center.classList.add("candyDoc__cursorCenter");

export function initCursor() {
  let isDragging = false;
  let isDraggingX = true;
  let isDraggingY = true;
  let startX;
  let startY;
  let deltaY;
  let deltaX;
  let zoom = 1;
  let pageScale=1
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("candyDoc__content") ||
      e.target.classList.contains("candyDoc__gridPanel") ||
      e.target.classList.contains("candyDoc__runningFooterEditor") ||
      e.target.classList.contains("candyDoc__runningHeaderEditor") ||
      e.target.classList.contains("candyDoc__leftContainer") ||
      e.target.classList.contains("candyDoc__rightContainer") ||
      e.target.classList.contains("candyDoc__diagram") ||
      e.target.parentElement.classList.contains("candyDoc__group")

    ) {
      e.target.append(cursor);
      cursor.style.left = e.offsetX - cursor.offsetWidth / 2 + "px";
      cursor.style.top = e.offsetY - cursor.offsetHeight / 2 + "px";
    }
  });
  cursor.addEventListener("mousedown", () => {
    isDragging = true;
    startX = cursor.offsetLeft;
    startY = cursor.offsetTop;
    deltaX = 0;
    deltaY = 0;
    cursor.style.left = startX + "px";
    cursor.style.Top = startY + "px";
    cursor.style.opacity = "0.5";
    zoom = window.devicePixelRatio;
    const page=document.body.querySelector(".candyDoc__pagesWrapper");
    pageScale=page.getBoundingClientRect().width/page.offsetWidth
    
    
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    if (isDraggingX) deltaX += e.movementX / (zoom * pageScale);
    if (isDraggingY) deltaY += e.movementY / (zoom * pageScale);
    let x = startX + deltaX;
    let y = startY + deltaY;
    const minX = -(cursor.offsetWidth / 2 - 2.55);
    const maxX =
      cursor.parentElement.offsetWidth - cursor.offsetWidth / 2 - 2.55;
    const minY = -(cursor.offsetHeight / 2 - 2.55);
    const maxY =
      cursor.parentElement.offsetHeight - cursor.offsetHeight / 2 - 2.55;
    if (x > maxX) {
      x = maxX;
    }
    if (x < minX) {
      x = minX;
    }
    if (y > maxY) {
      y = maxY;
    }
    if (y < minY) {
      y = minY;
    }
    const centerX=cursor.parentElement.offsetWidth/2;
    if(x>centerX)
    {
      getInsertTools().style.left="-400%"
    }
    else
    {
      getInsertTools().style.left="80%"
    }
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    if (!e.ctrlKey) {
      isDraggingX = true;
      isDraggingY = true;
      top?.remove();
      left?.remove();
      right?.remove();
      bottom?.remove();
      centerHorizontal?.remove();
      centerVertical?.remove();
      return;
    }
    const others = [...cursor.parentElement.children];
    others
      .filter((o) => !o.classList.contains("candyDoc__cursor"))
      .filter((o) => !o.classList.contains("candyDoc__guide"))
      .forEach((o) => {
        if (o.offsetTop == cursor.offsetTop + cursor.offsetHeight / 2) {
          cursor.parentElement.append(top);
          top.style.top = o.offsetTop + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            top?.remove();
          }
        }
        if (o.offsetLeft == cursor.offsetLeft + cursor.offsetWidth / 2) {
          left.style.left = o.offsetLeft + "px";
          cursor.parentElement.append(left);
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            left?.remove();
          }
        }
        if (
          o.offsetTop + o.offsetHeight ==
          cursor.offsetTop + cursor.offsetHeight / 2
        ) {
          cursor.parentElement.append(bottom);
          bottom.style.top = o.offsetTop + o.offsetHeight + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            bottom?.remove();
          }
        }
        if (
          o.offsetLeft + o.offsetWidth ==
          cursor.offsetLeft + cursor.offsetWidth / 2
        ) {
          cursor.parentElement.append(right);
          right.style.left = o.offsetLeft + o.offsetWidth + "px";
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            right?.remove();
          }
        }
        if (
          Math.abs(
            o.offsetLeft +
            o.offsetWidth / 2 -
            (cursor.offsetLeft + cursor.offsetWidth / 2)
          ) < 2
        ) {
          cursor.parentElement.append(centerVertical);
          centerVertical.style.left = o.offsetLeft + o.offsetWidth / 2 + "px";
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            centerVertical?.remove();
          }
        }
        if (
          Math.abs(
            o.offsetTop +
            o.offsetHeight / 2 -
            (cursor.offsetTop + cursor.offsetHeight / 2)
          ) < 2
        ) {
          cursor.parentElement.append(centerHorizontal);
          centerHorizontal.style.top = o.offsetTop + o.offsetHeight / 2 + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            centerHorizontal?.remove();
          }
        }
      });
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    cursor.style.opacity = "1";
    top?.remove();
    left?.remove();
    right?.remove();
    bottom?.remove();
    centerHorizontal?.remove();
    centerVertical?.remove();
  });
}

window.addEventListener("mousedown", (e) => {
  const insertToolbar = getInsertTools();
  if (!e.target.classList.contains("candyDoc__cursor") && !findAncestor(e.target,"candyDoc__cursor")) {
    insertToolbar?.remove()
    return;
  }
  cursor.append(insertToolbar)
})