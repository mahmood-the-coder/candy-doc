export const top = document.createElement("div");
import { getCenterLayoutElement } from "../../layout/index.js";

top.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleTop",

);



export function initRulerTopHandle() {
  let startY = 0;
  let deltaY = 0;
  let zoom = 1
  let contents;
  let draggable = [];
  let cursor = null;
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleTop")) return;

    const page = document.body.querySelector(".candyDoc__pagesWrapper")
    const pageScale = (page.getBoundingClientRect().width / page.offsetWidth)
    zoom = window.devicePixelRatio * pageScale;

    contents = document.querySelectorAll(".candyDoc__content");
    cursor = document.body.querySelector(".candyDoc__cursor");
    if (!cursor) return;
    cursor.dataset.startY = cursor.offsetTop.toString();
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
      const rightContainer = p.querySelector(".candyDoc__rightContainer");
      draggable = [...draggable, ...rightContainer.children].filter((i) =>
        i.classList.contains("draggable")
      );
    });
    draggable.forEach((d) => {
      d.dataset.startY = d.offsetTop.toString();
    });
    window.addEventListener("mousemove", handleMouseMove);
    deltaY = 0;
    startY = parseInt(window.getComputedStyle(top).top.replace("px", ""));
    contents?.forEach((c) => {
      c.style.borderTop = "1px solid var(--color)";
      c.style.borderTop = "1px solid var(--color)";
    });
  });

  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
    contents?.forEach((c) => {
      c.style.border = "none";
    });
  });
  function handleMouseMove(ev) {
    if (!contents || contents.length <= 0) return;

    deltaY += ev.movementY/zoom;

    let y = startY + deltaY;

    if (y < 25) {
      y = 25;
      return
    }

    const maxY = 400;
    if (y > maxY) {
      y = maxY;
      return
    }
    top.style.top = y + "px";
    contents.forEach((c) => {
      c.style.top = y + "px";
    });

    if (contents && contents[0])
      document.body.querySelectorAll(".candyDoc__pageHeader").forEach((h) => {
        h.style.bottom = `calc(100% - ${contents[0].style.top})`;
      });
    document.body.querySelectorAll(".candyDoc__leftContainer").forEach((l) => {
      l.style.top = contents[0].style.top;
    });
    document.body.querySelectorAll(".candyDoc__rightContainer").forEach((l) => {
      l.style.top = contents[0].style.top;
    });

    draggable.forEach((d) => {
      let startY = parseFloat(d.dataset.startY);
      let y = startY - deltaY;
      if (d.parentElement.classList.contains("candyDoc__pageHeader")) {
        y = startY;
        if (y > contents[0].offsetTop - d.offsetHeight) {
          y = contents[0].offsetTop - d.offsetHeight;
        }
      }

      if (y < 0) {
        y = 0;
      }
      if (top.offsetTop > 25) d.style.top = y + "px";
    });
    if (
      cursor.parentElement.classList.contains("candyDoc__content") ||
      cursor.parentElement.classList.contains(
        "candyDoc__pageActionsEditor"
      ) ||
      cursor.parentElement.classList.contains(
        "candyDoc__pageActionsEditor"
      ) ||
      cursor.parentElement.classList.contains("candyDoc__leftContainer") ||
      cursor.parentElement.classList.contains("candyDoc__rightContainer")
    ) {
      const cursorStartY = parseFloat(cursor.dataset.startY);
      let cursorY = cursorStartY - deltaY;

      if (cursorY < -cursor.offsetHeight / 2 + 2) {
        cursorY = -cursor.offsetHeight / 2 + 2;
      }
      if (top.offsetTop > 25) cursor.style.top = cursorY + "px";
    }
  }
}
