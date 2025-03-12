import { findAncestor } from "../find-ancestor/index.js";
import { guideBottom } from "../guide/elements/bottom.js";
import { guideCenterHorizontal } from "../guide/elements/centerHorizontal.js";
import { guideCenterVertical } from "../guide/elements/centerVertical.js";
import { guideLeft } from "../guide/elements/left.js";
import { guideRight } from "../guide/elements/right.js";
import { guideTop } from "../guide/elements/top.js";
import { getInsertTools } from "../insert-toolbar/index.js";
export const cursor = document.createElement("div");
cursor.classList.add("candyDoc__cursor");
const center = document.createElement("div");
cursor.append(center);
center.classList.add("candyDoc__cursorCenter");
let currentCursor = null;
export function initCursor() {
  let isDragging = false;
  let isDraggingX = true;
  let isDraggingY = true;
  let startX;
  let startY;
  let deltaY;
  let deltaX;
  let zoom = 1;
  let pageScale = 1
  window.addEventListener("mousedown", (e) => {
    if(e.button!=2)return
    isDragging=false;
    if (
      e.target.classList.contains("candyDoc__content") ||
      e.target.classList.contains("candyDoc__pageFooter") ||
      e.target.classList.contains("candyDoc__pageHeader") ||
      e.target.classList.contains("candyDoc__leftContainer") ||
      e.target.classList.contains("candyDoc__rightContainer") ||
      e.target.classList.contains("candyDoc__diagram") ||
      e.target.parentElement.classList.contains("candyDoc__group")

    ) {
      currentCursor = document.querySelector(".candyDoc__cursor") || cursor
      if (e.target.parentElement.classList.contains("candyDoc__group"))
        e.target.parentElement.append(currentCursor);
      else 
      {
        e.target.append(currentCursor)
      }
      currentCursor.style.left = e.offsetX - currentCursor.offsetWidth / 2 + "px";
      currentCursor.style.top = e.offsetY - currentCursor.offsetHeight / 2 + "px";
    }
  });
  window.addEventListener("mousedown", (e) => {

    const insertToolbar = document.body.querySelector(".candyDoc__insertToolsWrapper") || getInsertTools();
    if (e.target.classList.contains("candyDoc__cursor")) {
      currentCursor = e.target;
    }
    if (findAncestor(e.target, "candyDoc__cursor")) {
      currentCursor = findAncestor(e.target, "candyDoc__cursor")
    }
    if (!currentCursor) {
      insertToolbar?.remove()
      return
    };
    currentCursor.append(insertToolbar)
    isDragging = true;
    startX = currentCursor.offsetLeft;
    startY = currentCursor.offsetTop;
    deltaX = 0;
    deltaY = 0;
    currentCursor.style.left = startX + "px";
    currentCursor.style.Top = startY + "px";
    currentCursor.style.opacity = "0.5";
    zoom = window.devicePixelRatio;
    const page = document.body.querySelector(".candyDoc__pagesWrapper");
    pageScale = page.getBoundingClientRect().width / page.offsetWidth


  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    if (isDraggingX) deltaX += e.movementX / (zoom * pageScale);
    if (isDraggingY) deltaY += e.movementY / (zoom * pageScale);
    let x = startX + deltaX;
    let y = startY + deltaY;
    const minX = -(currentCursor.offsetWidth / 2 - 2.55);
    const maxX =
      currentCursor.parentElement.offsetWidth - currentCursor.offsetWidth / 2 - 2.55;
    const minY = -(currentCursor.offsetHeight / 2 - 2.55);
    const maxY =
      currentCursor.parentElement.offsetHeight - currentCursor.offsetHeight / 2 - 2.55;
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
    const centerX = currentCursor.parentElement.offsetWidth / 2;
    if (x > centerX) {
      getInsertTools().style.left = "-400%"
    }
    else {
      getInsertTools().style.left = "80%"
    }
    currentCursor.style.left = x + "px";
    currentCursor.style.top = y + "px";
    if (!e.ctrlKey) {
      isDraggingX = true;
      isDraggingY = true;
      guideTop?.remove();
      guideLeft?.remove();
      guideRight?.remove();
      guideBottom?.remove();
      guideCenterHorizontal?.remove();
      guideCenterVertical?.remove();
      return;
    }
    const others = [...currentCursor.parentElement.children];
    others
      .filter((o) => !o.classList.contains("candyDoc__currentCursor"))
      .filter((o) => !o.classList.contains("candyDoc__guide"))
      .forEach((o) => {
        if (o.offsetTop == currentCursor.offsetTop + currentCursor.offsetHeight / 2) {
          currentCursor.parentElement.append(guideTop);
          guideTop.style.top = o.offsetTop + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            guideTop?.remove();
          }
        }
        if (o.offsetLeft == currentCursor.offsetLeft + currentCursor.offsetWidth / 2) {
          guideLeft.style.left = o.offsetLeft + "px";
          currentCursor.parentElement.append(guideLeft);
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            guideLeft?.remove();
          }
        }
        if (
          o.offsetTop + o.offsetHeight ==
          currentCursor.offsetTop + currentCursor.offsetHeight / 2
        ) {
          currentCursor.parentElement.append(guideBottom);
          guideBottom.style.top = o.offsetTop + o.offsetHeight + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            guideBottom?.remove();
          }
        }
        if (
          o.offsetLeft + o.offsetWidth ==
          currentCursor.offsetLeft + currentCursor.offsetWidth / 2
        ) {
          currentCursor.parentElement.append(guideRight);
          guideRight.style.left = o.offsetLeft + o.offsetWidth + "px";
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            guideRight?.remove();
          }
        }
        if (
          Math.abs(
            o.offsetLeft +
            o.offsetWidth / 2 -
            (currentCursor.offsetLeft + currentCursor.offsetWidth / 2)
          ) < 2
        ) {
          currentCursor.parentElement.append(guideCenterVertical);
          guideCenterVertical.style.left = o.offsetLeft + o.offsetWidth / 2 + "px";
          isDraggingX = false;
          if (Math.abs(e.movementX) > 1.5) {
            isDraggingX = true;
            guideCenterVertical?.remove();
          }
        }
        if (
          Math.abs(
            o.offsetTop +
            o.offsetHeight / 2 -
            (currentCursor.offsetTop + currentCursor.offsetHeight / 2)
          ) < 2
        ) {
          currentCursor.parentElement.append(guideCenterHorizontal);
          guideCenterHorizontal.style.top = o.offsetTop + o.offsetHeight / 2 + "px";
          isDraggingY = false;
          if (Math.abs(e.movementY) > 1.5) {
            isDraggingY = true;
            guideCenterHorizontal?.remove();
          }
        }
      });
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    if (!currentCursor) return;
    isDragging = false;
    currentCursor.style.opacity = "1";
    guideTop?.remove();
    guideLeft?.remove();
    guideRight?.remove();
    guideBottom?.remove();
    guideCenterHorizontal?.remove();
    guideCenterVertical?.remove();
    currentCursor = null

  });
}

