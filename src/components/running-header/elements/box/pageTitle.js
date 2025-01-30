import { editor } from "../editor.js";
import { boxWrapper } from "./boxWrapper.js";

export const pageTitle = document.createElement("div");
pageTitle.classList.add("candyDoc__runningHeaderPageTitle","candyDoc__runningHeaderTool");
pageTitle.innerText = "Page Title";
pageTitle.addEventListener("mousedown", () => {
  const pageTitleBox = document.createElement("div");
  const page = document.body.querySelector(".candyDoc__cursor").parentElement.parentElement;
  if (!page) return;
  const title = page.dataset.name;
  pageTitleBox.innerText = title;
  pageTitleBox.contentEditable="true"
  pageTitleBox.addEventListener("keydown",(e)=>e.preventDefault())
  pageTitleBox.classList.add("candyDoc__runningHeaderBox","candyDoc__runningHeaderPageTitleTextBox","target")
  const boxWrapperClone=boxWrapper.cloneNode(true);
  boxWrapperClone.append(pageTitleBox)
  editor.append(boxWrapperClone);
});
