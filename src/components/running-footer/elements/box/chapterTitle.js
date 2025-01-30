import { editor } from "../editor.js";
import { boxWrapper } from "./boxWrapper.js";
export const chapterTitle = document.createElement("div");
chapterTitle.classList.add("candyDoc__runningFooterChapterTitle","candyDoc__runningFooterTool");
chapterTitle.innerText = "Chapter Title";
chapterTitle.addEventListener("mousedown", () => {
  const chapterTitleBox = document.createElement("div");
  const chapter = document.body.querySelector(".candyDoc__cursor").parentElement.parentElement;
  if (!chapter) return;
  const title = chapter.dataset.parentName;
 
  chapterTitleBox.innerText = title;
  chapterTitleBox.classList.add("candyDoc__runningFooterBox","candyDoc__runningFooterChapterTitleTextBox")
  const boxWrapperClone=boxWrapper.cloneNode(true)
  boxWrapperClone.append(chapterTitleBox)

  chapterTitleBox.contentEditable="true"
  chapterTitleBox.style.userSelect="auto"
  chapterTitleBox.addEventListener("keydown",(e)=>e.preventDefault())
  editor.append(boxWrapperClone);
})
