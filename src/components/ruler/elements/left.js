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
  let zoom = 1;
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("candyDoc__rulerHandleLeft") ) return;

    zoom = window.devicePixelRatio 

    
    contents = document.body.querySelectorAll(".candyDoc__content");
    draggable =  [...getCenterLayoutElement().querySelectorAll(".draggable"),getCenterLayoutElement().querySelector(".candyDoc__cursor")]
    const pages = document.body.querySelectorAll(".candyDoc__page");
    pages.forEach((p) => {
      const header = p.querySelector(".candyDoc__pageHeader");
      draggable = [...draggable, ...header.children].filter((i) =>
        i.classList.contains("draggable")|| i.classList.contains("candyDoc__cursor")
      );
      const footer = p.querySelector(".candyDoc__pageFooter");
      draggable = [...draggable, ...footer.children].filter((i) =>
        i.classList.contains("draggable")|| i.classList.contains("candyDoc__cursor")
      );
      const leftContainer = p.querySelector(".candyDoc__leftContainer");
      draggable = [...draggable, ...leftContainer.children].filter((i) =>
        i.classList.contains("draggable")|| i.classList.contains("candyDoc__cursor")
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
  }
}
