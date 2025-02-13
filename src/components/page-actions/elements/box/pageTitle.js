import { boxWrapper } from "./boxWrapper.js";

export const pageTitle = document.createElement("div");
pageTitle.classList.add("candyDoc__pageActionsPageTitle","candyDoc__pageActionsTool");
pageTitle.innerText = "Page Title";
pageTitle.addEventListener("mousedown", () => {
  const pageTitleBox = document.createElement("div");
  const page = document.body.querySelector(".candyDoc__cursor").parentElement.parentElement;
  if (!page) return;
  const title = page.dataset.name;
  pageTitleBox.innerText = title;
  pageTitleBox.contentEditable="true"
  pageTitleBox.addEventListener("keydown",(e)=>e.preventDefault())
  pageTitleBox.classList.add("candyDoc__pageActionsBox","candyDoc__pageActionsPageTitleTextBox","target")
  const boxWrapperClone=boxWrapper.cloneNode(true);
  boxWrapperClone.append(pageTitleBox)
});
