import { bottomLayoutElement } from "./elements/bottomLayoutElement.js";
import { centerLayoutElement } from "./elements/centerLayoutElement.js";
import { leftSideLayoutElement } from "./elements/leftSideLayoutElement.js";
import { mainLayoutElement } from "./elements/mainLayoutElement.js";
import { rightSideLayoutElement } from "./elements/rightSideLayoutElement.js";

export function getLayout() {
  return mainLayoutElement;
}

export function getRightSidLayoutElement() {
  return rightSideLayoutElement;
}

export function getCenterLayoutElement() {
  return centerLayoutElement;
}

export function getLeftSideLayoutElement() {
  return leftSideLayoutElement;
}

export function getBottomLayoutElement()
{
  return bottomLayoutElement;
}