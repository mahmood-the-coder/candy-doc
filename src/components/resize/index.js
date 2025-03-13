import { findAncestor } from "../find-ancestor/index.js";
import { handleBottom } from "./elements/handleBottom.js";
import { handleLeft } from "./elements/handleLeft.js";
import { handleRight } from "./elements/handleRight.js";
import { handleTop } from "./elements/handleTop.js";
let currentHandle = null;
let startX, startY, startWidth, startHeight;
let content;
let currentTarget = null;
let isResizing = false;
let deltaX = 0;
let deltaY = 0;
let zoom = 1;
let draggable = [];
const MIN_WIDTH = 10;
const MIN_HEIGHT = 10;

export function initResizable() {
  window.addEventListener("keyup", (e) => {
    if (e.code.includes("Control") && currentTarget) {
      startHeight = currentTarget.offsetHeight;
      startWidth = currentTarget.offsetWidth;
    }
  });
  window.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("handle"))
      currentTarget?.querySelectorAll(".handle").forEach((h) => h?.remove());
    currentTarget = null;
    currentTarget = findAncestor(e.target, "resizable");

    if (!currentTarget) {
      return;
    }
    zoom = window.devicePixelRatio
    const page = document.body.querySelector(".candyDoc__page")

    content = currentTarget?.parentElement;


    currentTarget.append(handleLeft, handleRight, handleBottom, handleTop);


    handleBottom.removeEventListener("mousedown", initResize);
    handleBottom.addEventListener("mousedown", initResize);
    handleTop.removeEventListener("mousedown", initResize);
    handleTop.addEventListener("mousedown", initResize);
    handleLeft.removeEventListener("mousedown", initResize);
    handleLeft.addEventListener("mousedown", initResize);
    handleRight.removeEventListener("mousedown", initResize);
    handleRight.addEventListener("mousedown", initResize);

    if (e.ctrlKey) {
      startHeight = currentTarget.offsetHeight;
      startWidth = currentTarget.offsetWidth;
    }
  });

  window.addEventListener("mouseup", () => {
    if (!isResizing) return;
    isResizing = false;
  });

  window.addEventListener("mousemove", handleMousemove);
}

function initResize(e) {
  isResizing = true;
  currentHandle = e.target;
  deltaX = 0;
  deltaY = 0;

  startX = currentHandle.parentElement.offsetLeft;
  startY = currentHandle.parentElement.offsetTop;
  startWidth = currentHandle.parentElement.offsetWidth;
  startHeight = currentHandle.parentElement.offsetHeight;
  draggable = [...currentTarget.children].filter((i) =>
    i.classList.contains("draggable")
  );
  draggable.forEach((d) => {
    d.dataset.startX = d.offsetLeft.toString();
    d.dataset.startY = d.offsetTop.toString();
  });
}

function handleMousemove(e) {
  if (!isResizing) return;

  deltaX += e.movementX / (zoom);
  deltaY += e.movementY / (zoom);

  if (currentHandle.classList.contains("candyDoc__resizeHandleRight")) {
    let width = startWidth + deltaX;

    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
      return;
    }
    const maxWidth =
      content.getBoundingClientRect().right -
      currentTarget.getBoundingClientRect().left;
    if (width > maxWidth) {
      width = maxWidth;
      return;
    }
    draggable.forEach((d) => {
      let startX = parseFloat(d.dataset.startX);
      if (startX > width - d.offsetWidth) {
        startX = width - d.offsetWidth;
      }
      d.style.left = startX + "px";
    });
    currentTarget.style.width = width + "px";
    if (e.ctrlKey) {
      let height = startHeight + deltaX;
      if (height < MIN_HEIGHT) {
        height = MIN_HEIGHT;
        return;
      }

      const maxHeight =
        content.getBoundingClientRect().bottom -
        currentTarget.getBoundingClientRect().y;
      if (height > maxHeight) {
        height = maxHeight;
        return;
      }
      draggable.forEach((d) => {
        const startY = parseFloat(d.dataset.startY);
        let y = startY;

        if (y > height - d.offsetHeight) {
          y = height - d.offsetHeight;
        }
        d.style.top = y + "px";
      });
      currentTarget.style.height = height + "px";
    }
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleBottom")) {
    let height = startHeight + deltaY;

    if (height < MIN_HEIGHT) {
      height = MIN_HEIGHT;
      return;
    }

    const maxHeight =
      content.getBoundingClientRect().bottom -
      currentTarget.getBoundingClientRect().y;
    if (height > maxHeight) {
      height = maxHeight;
      return;
    }
    draggable.forEach((d) => {
      const startY = parseFloat(d.dataset.startY);
      let y = startY;

      if (y > height - d.offsetHeight) {
        y = height - d.offsetHeight;
      }
      d.style.top = y + "px";
    });
    currentTarget.style.height = height + "px";
    if (e.ctrlKey) {
      let width = startWidth + deltaY;
      if (width < MIN_WIDTH) {
        width = MIN_WIDTH;
        return;
      }
      const maxWidth =
        content.getBoundingClientRect().right -
        currentTarget.getBoundingClientRect().left;
      if (width > maxWidth) {
        width = maxWidth;
        return;
      }
      draggable.forEach((d) => {
        let startX = parseFloat(d.dataset.startX);
        if (startX > width - d.offsetWidth) {
          startX = width - d.offsetWidth;
        }
        d.style.left = startX + "px";
      });
      currentTarget.style.width = width + "px";
    }
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleTop")) {
    let height = startHeight - deltaY;

    let top = startY + deltaY;
    if (height < MIN_HEIGHT) {
      height = MIN_HEIGHT;
      return;
    }
    const maxHeight =
      currentTarget.getBoundingClientRect().bottom -
      content.getBoundingClientRect().top;
    if (height > maxHeight) {
      height = maxHeight;
      return;
    }
    draggable.forEach((d) => {
      const startY = parseFloat(d.dataset.startY);
      let y = startY - deltaY;

      if (y < 0) {
        y = 0;
      }

      d.style.top = y + "px";
    });
    currentTarget.style.height = height + "px";
    currentTarget.style.top = top + "px";
    if (e.ctrlKey) {
      let width = startWidth - deltaY;
      if (width < MIN_WIDTH) {
        width = MIN_WIDTH;
        return;
      }
      const maxWidth =
        content.getBoundingClientRect().right -
        currentTarget.getBoundingClientRect().left;
      if (width > maxWidth) {
        width = maxWidth;
        return;
      }
      draggable.forEach((d) => {
        let startX = parseFloat(d.dataset.startX);
        if (startX > width - d.offsetWidth) {
          startX = width - d.offsetWidth;
        }
        d.style.left = startX + "px";
      });
      currentTarget.style.width = width + "px";
    }
  } else if (currentHandle.classList.contains("candyDoc__resizeHandleLeft")) {
    let width = startWidth - deltaX;
    let left = startX + deltaX;

    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
      return;
    }
    const maxWidth =
      currentTarget.getBoundingClientRect().right -
      content.getBoundingClientRect().x;
    if (width > maxWidth) {
      width = maxWidth;
      return;
    }
    draggable.forEach((d) => {
      const startX = parseFloat(d.dataset.startX);
      let x = startX - deltaX;
      if (x < 0) {
        x = 0;
      }
      d.style.left = x + "px";
    });
    currentTarget.style.width = width + "px";
    currentTarget.style.left = left + "px";
    if (e.ctrlKey) {
      let height = startHeight - deltaX;
      if (height < MIN_HEIGHT) {
        height = MIN_HEIGHT;
        return;
      }

      const maxHeight =
        content.getBoundingClientRect().bottom -
        currentTarget.getBoundingClientRect().y;
      if (height > maxHeight) {
        height = maxHeight;
        return;
      }
      draggable.forEach((d) => {
        const startY = parseFloat(d.dataset.startY);
        let y = startY;

        if (y > height - d.offsetHeight) {
          y = height - d.offsetHeight;
        }
        d.style.top = y + "px";
      });

      currentTarget.style.height = height + "px";
    }
  }
}
