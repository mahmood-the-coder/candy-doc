import { findAncestor } from "../find-ancestor/index.js";
import { getCenterLayoutElement } from "../layout/index.js";
import {  bottomRuler, initRulerBottomHandle } from "./elements/bottom.js";
import { initRulerLeftHandle, leftRuler } from "./elements/left.js";
import { initRulerRightHandle,  rightRuler } from "./elements/right.js";
import { initRulerTopHandle,  topRuler } from "./elements/top.js";

export function initRuler() {
  initRulerTopHandle();
  initRulerBottomHandle();
  initRulerLeftHandle();
  initRulerRightHandle();

  getCenterLayoutElement()
    .querySelector(".candyDoc__page")
    .append(leftRuler, rightRuler, topRuler, bottomRuler);

  getCenterLayoutElement().addEventListener("mousedown", (e) => {
    const page = findAncestor(e.target, "candyDoc__page");
    if (e.target.classList.contains("candyDoc__page"))
      e.target.append(leftRuler, rightRuler, topRuler, bottomRuler);
    else if(page) {
      page.append(leftRuler, rightRuler, topRuler, bottomRuler);
    }

    const container=getCenterLayoutElement().querySelector(".candyDoc__content")
    leftRuler.style.left=container.style.left;
    rightRuler.style.right=container.style.right;
    topRuler.style.top=container.style.top;
    bottomRuler.style.bottom=container.style.bottom
  });

  const contents = getCenterLayoutElement().querySelectorAll("candyDoc__content");
  contents.forEach((c) => {
    c.style.left = leftRuler.offsetLeft + "px";
    c.style.right = leftRuler.offsetRight + "px";
    c.style.bottom = leftRuler.offsetBottom + "px";
    c.style.top = leftRuler.offsetTop + "px";
  });
}
