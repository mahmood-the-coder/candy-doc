import { getSelected } from "../../../selection/index.js";
import { slice } from "./slice.js";
import { borderImage } from "../../../base64/base64.js";
// slicer wrapper
export const slicer = document.createElement("div");
slicer.classList.add("candyDoc__inspectorSlicer");

// image
const image = document.createElement("img");
image.classList.add("candyDoc__inspectorSlicerImage");


image.src = borderImage;

// top handle
const top = document.createElement("div");
top.classList.add("candyDoc__inspectorSlicerTop", "candyDoc__slicerHandle");
top.dataset.direction = "top";
const bottom = document.createElement("div");
bottom.dataset.direction = "bottom";
bottom.classList.add(
  "candyDoc__inspectorSlicerBottom",
  "candyDoc__slicerHandle"
);

// left handle
const left = document.createElement("div");
left.classList.add("candyDoc__inspectorSlicerLeft", "candyDoc__slicerHandle");
left.dataset.direction = "left";

// right handle
const right = document.createElement("div");
right.classList.add("candyDoc__inspectorSlicerRight", "candyDoc__slicerHandle");
right.dataset.direction = "right";

// appending slicer elements
slicer.append(image, top, bottom, left, right);

// events
export function initSlicerDrag() {
  let direction = "";
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let target = null;
  slicer.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__slicerHandle")) return;
    isDragging = true;
    target = e.target;
    deltaX = 0;
    deltaY = 0;
    startX = e.target.offsetLeft;
    startY = e.target.offsetTop;
    direction = e.target.dataset.direction;
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX += e.movementX;
    deltaY += e.movementY;
    let move;
    
    if (direction == "left") {
      move = startX + deltaX;
      move = clampMove(move, target, direction);
      const input = document.querySelector(".candyDoc__sliceControllerLeft");
      input.value = move;
      
      const selected = getSelected();
      if (!selected) return;
      

      selected.querySelector(".target").style.borderImageSlice = `${move} ${[
        ...slice.querySelectorAll("input"),
      ]
        .slice(1)
        .map((i) => i.value )
        .join(" ")}`;
     
    }

    if (direction == "right") {
      move = target.parentElement.offsetWidth - startX - 5 - deltaX;
      move = clampMove(move, target, direction);
      const input = document.querySelector(".candyDoc__sliceControllerRight");
      input.value = move;

      const selected = getSelected();
      if (!selected) return;
      selected.querySelector(".target").style.borderImageSlice = `${[
        ...slice.querySelectorAll("input"),
      ]
        .map((i) => i.value )
        .join(" ")}`;
    
    }

    if (direction == "top") {
      move = startY + deltaY;
      move = clampMove(move, target, direction);
      const input = document.querySelector(".candyDoc__sliceControllerTop");
      input.value = move;

      const selected = getSelected();
      if (!selected) return;
      selected.querySelector(".target").style.borderImageSlice = `${[
        ...slice.querySelectorAll("input"),
      ]
        .map((i) => i.value )
        .join(" ")}`;
    
    }

    if (direction == "bottom") {
      move = target.parentElement.offsetHeight - startY - 5 - deltaY;
      move = clampMove(move, target, direction);
      const input = document.querySelector(".candyDoc__sliceControllerBottom");
      input.value = move;

      const selected = getSelected();
      if (!selected) return;
      selected.querySelector(".target").style.borderImageSlice = `${[
        ...slice.querySelectorAll("input"),
      ]
        .map((i) => i.value )
        .join(" ")}`;
     
    }

    move = clampMove(move, target, direction);
    target.style[direction] = move + "px";
  });
  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  function clampMove(move, target, direction) {
    if (move < 0) {
      move = 0;
    }
    console.log(move, target.parentElement.offsetWidth);

    if (
      move > target.parentElement.offsetWidth &&
      (direction == "right" || direction == "left")
    ) {
      move = target.parentElement.offsetWidth;
    }
    if (
      move > target.parentElement.offsetHeight &&
      (direction == "top" || direction == "bottom")
    ) {
      move = target.parentElement.offsetHeight;
    }
    return move;
  }
}
