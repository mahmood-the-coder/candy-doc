import { findAncestor } from "../find-ancestor/index.js";
import { bottom } from "../guide/elements/bottom.js";
import { centerHorizontal } from "../guide/elements/centerHorizontal.js";
import { centerVertical } from "../guide/elements/centerVertical.js";
import { left } from "../guide/elements/left.js";
import { right } from "../guide/elements/right.js";
import { top } from "../guide/elements/top.js";
import { getSnapSize } from "../guide/snapSize.js";
import { isInside } from "../intersection/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { setZIndex } from "../z-index/index.js";
import { dragHandle } from "./elements/dragHandle.js";
let target;
let content;
let deltaY = 0;
let deltaX = 0;
let startY = 0;
let startX = 0;
let clone;
let isDragging = false;
let isDraggingX = true;
let isDraggingY = true;
let zoom=1;
let pageScale=1
window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("candyDoc__dragHandle")) {
    return;
  }
  
 
  const page=document.body.querySelector(".candyDoc__pagesWrapper")
  pageScale=(page.getBoundingClientRect().width/page.offsetWidth)
  zoom=window.devicePixelRatio *pageScale; 
  isDragging = true;
  const moveHandle = e.target;

  target = moveHandle.parentElement;
  content = moveHandle.parentElement?.parentElement || null;
  if (!content) return;
  if (!target) return;

  target.dataset.state = "dragging";
  target.classList.add("dragging");
  clone = target.cloneNode(true);
  clone.id = "drag-clone";
  clone.style.position = "absolute";

  deltaY = 0;
  deltaX = 0;

  startY = Math.round(target.offsetTop/ getSnapSize()) * getSnapSize();
  startX =
    Math.round(
     target.offsetLeft /
        getSnapSize()
    ) * getSnapSize();
  clone.style.top = startY + "px";
  clone.style.left = startX + "px";
  content.append(clone);

  target.style.opacity = "0";
  clone.style.opacity = "0.5";

  window.addEventListener("mousemove", handleMousemove);
});
window.addEventListener("mouseup", () => {
  if (!target) return;
  if (!content) return;
  if (!clone) return;
  window.removeEventListener("mousemove", handleMousemove);

  if (window.getComputedStyle(target).float == "right") {
    target.style.right = "0";
  } else if (window.getComputedStyle(target).float == "left") {
    target.style.left = "0";
  } else {
    target.style.left =
      parseInt(window.getComputedStyle(clone).left.replace("px", "")) + "px";
  }

  target.style.top =
    parseInt(window.getComputedStyle(clone).top.replace("px", "")) + "px";

  target.style.opacity = "1";
  target.dataset.state = "";

  clone.remove();
  clone = null;
  isDragging = false;
 
  grouping()
  function grouping() {
    const draggable = [...getCenterLayoutElement().querySelector(".candyDoc__pagesWrapper").querySelectorAll(".draggable")].filter(d=>!d.classList.contains("dragging")).filter(d=>d.classList.contains("candyDoc__groupWrapper"));
    const dragging=getCenterLayoutElement().querySelector(".candyDoc__pagesWrapper").querySelector(".dragging");
    const draggingRect=dragging.getBoundingClientRect();
    draggable.forEach(d=>{
      const draggableRect=d.getBoundingClientRect();
      if(isInside(draggableRect,draggingRect))
      {
          if(d.classList.contains("candyDoc__groupWrapper")) 
          d.querySelector(".target").append(dragging)
          dragging.style.left=draggingRect.left-draggableRect.left +"px"
          dragging.style.top=draggingRect.top-draggableRect.top +"px"
      }
      else
      {
         if(dragging.contains(d))return;
         if(dragging.contains(d.parentElement))return;
         d.parentElement.append(dragging)
           dragging.style.left=draggingRect.left-d.parentElement.getBoundingClientRect().left +"px"
          dragging.style.top=draggingRect.top-d.parentElement.getBoundingClientRect().top +"px"
         
      }
      
    })
    
  }
  target.classList.remove("dragging");
  top?.remove();
  left?.remove();
  bottom?.remove();
  right?.remove();
  centerHorizontal?.remove();
  centerVertical?.remove();
});

function handleMousemove(e) {
  if (!isDragging) return;
  if (!content) return;
  if (!target) return;
  if (!clone) return;
  
  if (isDraggingY) deltaY += e.movementY/zoom;
  if (isDraggingX) deltaX += e.movementX/zoom;

  let x = startX + deltaX
  let y = startY + deltaY
  y = Math.round(y / getSnapSize()) * getSnapSize();
  x = Math.round(x / getSnapSize()) * getSnapSize();


 
  

  const maxX =
    content.getBoundingClientRect().width/pageScale -
    target.getBoundingClientRect().width/pageScale
  const minX = 0 ;

  if (
    !target.parentElement.classList.contains("braces") &&
    !target.parentElement.parentElement.classList.contains("candyDoc__group") &&
    !target.classList.contains("candyDoc__tableWrapper")
  ) {
    if (x < minX) {
      x = minX;
    }
    if (x > maxX) {
      x = maxX;
    }
  }

  const maxY =
    content.getBoundingClientRect().height/pageScale -
    target.getBoundingClientRect().height/pageScale
  const minY = 0 ;

  if (
    !target.parentElement.classList.contains("braces") &&
    !target.parentElement.parentElement.classList.contains("candyDoc__group") &&
    !target.classList.contains("candyDoc__tableWrapper")
  ) {
    if (y < minY) {
      y = minY;
    }
    if (y > maxY) {
      y = maxY;
    }
  }
  
  clone.style.top = y+"px";
  clone.style.left = x+"px";

  setZIndex(clone);
  target.style.zIndex = clone.style.zIndex;
  if (!e.ctrlKey) {
    isDraggingX = true;
    isDraggingY = true;
    top?.remove();
    bottom?.remove();
    left?.remove();
    right?.remove();
    centerHorizontal?.remove();
    centerVertical?.remove();
    return;
  }
  const others = [...target.parentElement.children];
  others
    .filter((o) => o.id != target.id)
    .filter((o) => o.id != "drag-clone")
    .filter((o) => !o.classList.contains("candyDoc__cursor"))
    .filter((o) => !o.classList.contains("candyDoc__guide"))
    .forEach((o) => {
      if (Math.abs(o.getBoundingClientRect().top - clone.getBoundingClientRect().top)<=1) {
        target.parentElement.append(top);
        top.style.top = o.offsetTop + "px";
        isDraggingY = false;
        if (Math.abs(e.movementY) > 1.5) {
          isDraggingY = true;
          top?.remove();
        }
      }
      if (Math.abs(o.getBoundingClientRect().left - clone.getBoundingClientRect().left)<=1) {
        left.style.left = o.offsetLeft + "px";
        target.parentElement.append(left);
        isDraggingX = false;
        if (Math.abs(e.movementX) > 1.5) {
          isDraggingX = true;
          left?.remove();
        }
      }
      if (
       Math.abs( (o.offsetTop + o.offsetHeight) -
       (clone.offsetTop + clone.offsetHeight))
      <=1) {
        target.parentElement.append(bottom);
        bottom.style.top =
          o.offsetTop + o.getBoundingClientRect().height + "px";
        isDraggingY = false;
        if (Math.abs(e.movementY) > 1.5) {
          isDraggingY = true;
          bottom?.remove();
        }
      }
      if (
       Math.abs( (o.offsetLeft + o.offsetWidth) -
       (clone.offsetLeft + clone.offsetWidth))<=1
      ) {
        target.parentElement.append(right);
        right.style.left =
          o.offsetLeft + o.getBoundingClientRect().width + "px";
        isDraggingX = false;
        if (Math.abs(e.movementX) > 1.5) {
          isDraggingX = true;
          right?.remove();
        }
      }

      if (
       Math.abs((o.offsetTop) -
        (clone.offsetTop + clone.offsetHeight))<=1
      ) {
        target.parentElement.append(top);
        top.style.top = o.offsetTop + "px";
        isDraggingY = false;
        if (Math.abs(e.movementY) > 1.5) {
          isDraggingY = true;
          top?.remove();
        }
      }
      if (o.offsetLeft == clone.offsetLeft + clone.offsetWidth) {
        left.style.left = o.offsetLeft + "px";
        isDraggingX = false;
        if (Math.abs(e.movementX) > 1.5) {
          isDraggingX = true;
          left?.remove();
        }

        target.parentElement.append(left);
      }
      if (Math.abs((o.offsetTop + o.offsetHeight)- (clone.offsetTop))<=1) {
        target.parentElement.append(bottom);
        bottom.style.top =
          o.offsetTop + o.getBoundingClientRect().height + "px";
        isDraggingY = false;
        if (Math.abs(e.movementY) > 1.5) {
          isDraggingY = true;
          bottom?.remove();
        }
      }
      if (Math.abs((o.offsetLeft + o.offsetWidth) - clone.offsetLeft)<=1) {
        target.parentElement.append(right);
        right.style.left =
          o.offsetLeft + o.getBoundingClientRect().width + "px";
        isDraggingX = false;
        if (Math.abs(e.movementX) > 1.5) {
          isDraggingX = true;
          right?.remove();
        }
      }
      if (
        Math.abs(
          o.offsetLeft +
            o.getBoundingClientRect().width / 2 -
            (clone.offsetLeft + clone.getBoundingClientRect().width / 2)
        ) < 2
      ) {
        target.parentElement.append(centerVertical);
        centerVertical.style.left =
          o.offsetLeft + o.getBoundingClientRect().width / 2 + "px";
        isDraggingX = false;
        if (Math.abs(e.movementX) > 1.5) {
          isDraggingX = true;
          centerVertical?.remove();
        }
      }
      if (
        Math.abs(
          o.offsetTop +
            o.getBoundingClientRect().height / 2 -
            (clone.offsetTop + clone.getBoundingClientRect().height / 2)
        ) < 2
      ) {
        target.parentElement.append(centerHorizontal);
        centerHorizontal.style.top =
          o.offsetTop + o.getBoundingClientRect().height / 2 + "px";
        isDraggingY = false;
        if (Math.abs(e.movementY) > 1.5) {
          isDraggingY = true;
          centerHorizontal?.remove();
        }
      }
    });
}


export function initDraggable() {
  window.addEventListener("mousedown", initDrag);
}

function initDrag(e) {
  let target = null;
  target = findAncestor(e.target, "draggable");

  if (!target) {
    dragHandle?.remove();
    target = null;
  } else {
    target.append(dragHandle);
  }
}
 