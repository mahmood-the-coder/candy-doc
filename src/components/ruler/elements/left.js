import { getCenterLayoutElement } from "../../layout/index.js";

export const left = document.createElement("div");
left.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleLeft",
);

export function initRulerLeftHandle() {
  let startX = 0;
  let deltaX = 0;
  let contents;
  let draggable = [];
  let cursor = null;
  let zoom = 1;
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleLeft") ) return;

    zoom = window.devicePixelRatio 

    cursor = document.body.querySelector(".candyDoc__cursor");
    if (!cursor) return;
    cursor.dataset.startX = cursor.offsetLeft.toString();
    contents = document.body.querySelectorAll(".candyDoc__content");
    draggable = getCenterLayoutElement().querySelectorAll(".draggable")
    const pages = document.body.querySelectorAll(".candyDoc__page");
    pages.forEach((p) => {
      const header = p.querySelector(".candyDoc__pageHeader");
      draggable = [...draggable, ...header.children].filter((i) =>
        i.classList.contains("draggable")
      );
      const footer = p.querySelector(".candyDoc__pageFooter");
      draggable = [...draggable, ...footer.children].filter((i) =>
        i.classList.contains("draggable")
      );
      const leftContainer = p.querySelector(".candyDoc__leftContainer");
      draggable = [...draggable, ...leftContainer.children].filter((i) =>
        i.classList.contains("draggable")
      );

    });
    draggable.forEach((d) => {
      d.dataset.startX = d.offsetLeft.toString();
    });
    window.addEventListener("mousemove", handleMouseMove);
    deltaX = 0;
    startX = parseInt(window.getComputedStyle(left).left.replace("px", ""));
    contents?.forEach((c) => {
      c.style.borderRight = "1px solid var(--color)";
      c.style.borderLeft = "1px solid var(--color)";
    });
  });

  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
    contents?.forEach((c) => {
      c.style.border = "none";
    });
  });
  function handleMouseMove(e) {
    if (!contents || contents.length <= 0) return;

    deltaX += e.movementX/zoom;

    let x = startX + deltaX;

    if (x < 25) {
      x = 25;
    }

    const maxX = 300;
    if (x > maxX) {
      x = maxX;
      return;
    }
    left.style.left = x + "px";
    contents.forEach((c) => {
      c.style.left = x + "px";
    });



    document.body.querySelectorAll(".candyDoc__pageHeader").forEach((h) => {
      h.style.left = contents[0].style.left;
    });
    document.body.querySelectorAll(".candyDoc__pageFooter").forEach((h) => {
      h.style.left = contents[0].style.left;
    });
    document.body.querySelectorAll(".candyDoc__leftContainer").forEach((l) => {
      l.style.right = `calc(100% - ${contents[0].style.left})`;
    });
    draggable.forEach((d) => {
      let startX = parseFloat(d.dataset.startX);
      let x = startX - deltaX;
      if (x < 0) {
        x = 0;
      }
      if (d.parentElement.classList.contains("candyDoc__leftContainer")) {
        x = startX;
        if (x > left.offsetLeft - d.offsetWidth) {
          x = left.offsetLeft - d.offsetWidth
        }
      }

      if (left.offsetLeft > 25) d.style.left = x + "px";
    });
    if (
      cursor.parentElement.classList.contains("candyDoc__content") ||
      cursor.parentElement.classList.contains(
        "candyDoc__pageActionsEditor"
      ) ||
      cursor.parentElement.classList.contains(
        "candyDoc__runningFooterEditor"
      ) ||
      cursor.parentElement.classList.contains("candyDoc__leftContainer")
    ) {
      const cursorStartX = parseFloat(cursor.dataset.startX);

      let cursorX = cursorStartX - deltaX;
      if (cursor.parentElement.classList.contains("candyDoc__leftContainer")) {
        cursorX = cursorStartX;
        if (cursorX > left.offsetLeft - cursor.offsetWidth / 2 - 5) {
          cursorX = left.offsetLeft - cursor.offsetWidth / 2 - 5;
        }
      }
      if (cursorX < -cursor.offsetWidth / 2 + 2) {
        cursorX = -cursor.offsetWidth / 2 + 2;
      }
      if (left.offsetLeft > 25) cursor.style.left = cursorX + "px";
    }
  }
}
