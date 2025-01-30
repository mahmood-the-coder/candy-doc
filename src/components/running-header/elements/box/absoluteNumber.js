import { editor } from "../editor.js";
import { boxWrapper } from "./boxWrapper.js";

export const absoluteNumber = document.createElement("div");
absoluteNumber.classList.add("candyDoc__runningHeaderAbsoluteNumber","candyDoc__runningHeaderTool");
absoluteNumber.innerText = "Absolute Page Number";
absoluteNumber.addEventListener("mousedown", () => {
  const absoluteNumberBox = document.createElement("div");
  const page = document.body.querySelector(".candyDoc__cursor").parentElement.parentElement;
  if (!page) return;
  const absoluteIndex = page.dataset.index;
  absoluteNumberBox.innerText = (parseInt(absoluteIndex) + 1).toString();
  absoluteNumberBox.contentEditable="true"
  absoluteNumberBox.addEventListener("keydown",(e)=>e.preventDefault())
  absoluteNumberBox.classList.add("candyDoc__runningHeaderBox","target")
  const boxWrapperClone=boxWrapper.cloneNode(true);
  boxWrapperClone.append(absoluteNumberBox)
  editor.append(boxWrapperClone);
});
