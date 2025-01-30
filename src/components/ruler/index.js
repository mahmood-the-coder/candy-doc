import { findAncestor } from "../find-ancestor/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import { bottom, initRulerBottomHandle } from "./elements/bottom.js";
import { initRulerLeftHandle, left } from "./elements/left.js";
import { initRulerRightHandle, right } from "./elements/right.js";
import { initRulerTopHandle, top } from "./elements/top.js";

export function initRuler() {
  initRulerTopHandle();
  initRulerBottomHandle();
  initRulerLeftHandle();
  initRulerRightHandle();

  getCenterLayoutElement()
    .querySelector(".candyDoc__page")
    .append(left, right, top, bottom);

  getCenterLayoutElement().addEventListener("mousedown", (e) => {
    const page = findAncestor(e.target, "candyDoc__page");
    if (e.target.classList.contains("candyDoc__page"))
      e.target.append(left, right, top, bottom);
    else if(page) {
      page.append(left, right, top, bottom);
    }

    const container=getCenterLayoutElement().querySelector(".candyDoc__content")
    left.style.left=container.style.left;
    right.style.right=container.style.right;
    top.style.top=container.style.top;
    bottom.style.bottom=container.style.bottom
  });

  const contents = getCenterLayoutElement().querySelectorAll("candyDoc__content");
  contents.forEach((c) => {
    c.style.left = left.offsetLeft + "px";
    c.style.right = left.offsetRight + "px";
    c.style.bottom = left.offsetBottom + "px";
    c.style.top = left.offsetTop + "px";
  });
}
