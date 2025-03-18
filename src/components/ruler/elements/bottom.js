import { topRuler } from "./top.js";
import { getCenterLayoutElement } from "../../layout/index.js";
export const bottomRuler = document.createElement("div");
bottomRuler.classList.add(
  "candyDoc__rulerHandle",
  "candyDoc__rulerHandleBottom",

);

export function initRulerBottomHandle() {
  let startY = 0;
  let deltaY = 0;
  let contents;
  let draggable = [];
  let zoom = 1
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleBottom")) return;

    const page = document.body.querySelector(".candyDoc__pagesWrapper")
    const pageScale = (page.getBoundingClientRect().width / page.offsetWidth)
    zoom = window.devicePixelRatio * pageScale;

    contents = document.body.querySelectorAll(".candyDoc__content");
    
    draggable =  [...getCenterLayoutElement().querySelectorAll(".draggable"),getCenterLayoutElement().querySelector(".candyDoc__cursor")]

    const pages = document.body.querySelectorAll(".candyDoc__page");
    pages.forEach((p) => {
      const header = p.querySelector(".candyDoc__pageHeader");
      draggable = [...draggable, ...header.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
      const footer = p.querySelector(".candyDoc__pageFooter");
      draggable = [...draggable, ...footer.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
      const leftContainer = p.querySelector(".candyDoc__leftContainer");
      draggable = [...draggable, ...leftContainer.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
      const rightContainer = p.querySelector(".candyDoc__rightContainer");
      draggable = [...draggable, ...rightContainer.children].filter((i) =>
        i.classList.contains("draggable") || i.classList.contains("candyDoc__cursor")
      );
    });
    draggable.forEach((d) => {
      d.dataset.startY = d.offsetTop.toString();
    });
    window.addEventListener("mousemove", handleMouseMove);
    deltaY = 0;
    startY = parseInt(window.getComputedStyle(bottomRuler).bottom.replace("px", ""));
    
  });

  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleMouseMove);
  });
  function handleMouseMove(ev) {
    if (!contents || contents.length <= 0) return;

    deltaY -= ev.movementY / zoom;

    let y = startY + deltaY;

    if (y < 25) {
      y = 25;
    }

    const maxY = 400;
    if (y > maxY) {
      y = maxY;
    }
    bottomRuler.style.bottom = y + "px";
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
        bottomRuler.offsetTop - d.offsetHeight - topRuler.offsetTop + bottomRuler.offsetHeight
      ) {
        y =
          bottomRuler.offsetTop -
          d.offsetHeight -
          topRuler.offsetTop +
          bottomRuler.offsetHeight;
      }
      d.style.top = y + "px";
    });
   

  }
}

