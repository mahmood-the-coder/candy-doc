import { top } from "./top.js";
import { getCenterLayoutElement } from "../../layout/index.js";
export const bottom = document.createElement("div");
bottom.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleBottom",

);

export function initRulerBottomHandle() {
  let startY = 0;
  let deltaY = 0;
  let contents;
  let draggable = [];
  let cursor = null;
  let zoom = 1
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleBottom")) return;

    const page = document.body.querySelector(".candyDoc__pagesWrapper")
    const pageScale = (page.getBoundingClientRect().width / page.offsetWidth)
    zoom = window.devicePixelRatio * pageScale;

    contents = document.body.querySelectorAll(".candyDoc__content");
    cursor = document.body.querySelector(".candyDoc__cursor");
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
    startY = parseInt(window.getComputedStyle(bottom).bottom.replace("px", ""));
    contents?.forEach((c) => {
      c.style.borderTop = "1px solid var(--color)";
      c.style.borderBottom = "1px solid var(--color)";
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
    if (!cursor) return;

    deltaY -= ev.movementY/zoom;

    let y = startY + deltaY;

    if (y < 25) {
      y = 25;
    }

    const maxY = 400;
    if (y > maxY) {
      y = maxY;
    }
    bottom.style.bottom = y + "px";
    contents.forEach((c) => {
      c.style.bottom = y + "px";
    });


    if (contents && contents[0])
      document.body.querySelectorAll(".candyDoc__pageFooter").forEach((h) => {
        h.style.top = `calc(100% - ${contents[0].style.bottom})`;
      });
    document.body.querySelectorAll(".candyDoc__leftContainer").forEach((l) => {
      l.style.bottom = contents[0].style.bottom;
    });
    document.body.querySelectorAll(".candyDoc__rightContainer").forEach((l) => {
      l.style.bottom = contents[0].style.bottom;
    });
    draggable.forEach((d) => {
      let startY = parseFloat(d.dataset.startY);
      let y = startY;
      if (d.parentElement.classList.contains("candyDoc__pageFooter")) {
        y = startY + deltaY;

        if (y < 0) {
          y = 0;
        }
      }
      if (
        y >
        bottom.offsetTop - d.offsetHeight - top.offsetTop + bottom.offsetHeight
      ) {
        y =
          bottom.offsetTop -
          d.offsetHeight -
          top.offsetTop +
          bottom.offsetHeight;
      }
      d.style.top = y + "px";
    });
    if (
      cursor.parentElement.classList.contains("candyDoc__content") ||
      cursor.parentElement.classList.contains(
        "candyDoc__runningFooterEditor"
      ) ||
      cursor.parentElement.classList.contains(
        "candyDoc__runningFooterEditor"
      ) ||
      cursor.parentElement.classList.contains("candyDoc__leftContainer") ||
      cursor.parentElement.classList.contains("candyDoc__rightContainer")
    ) {
      const cursorStartY = parseFloat(cursor.dataset.startY);
      let cursorY = cursorStartY;

      if (
        cursorY >
        bottom.offsetTop - top.offsetTop - 5
      ) {
        cursorY =
          bottom.offsetTop - top.offsetTop - 5;
      }

      cursor.style.top = cursorY + "px";
    }

  }
}

