import { editor } from "../editor.js";
import { boxWrapper } from "./boxWrapper.js";

export const bookTitle = document.createElement("div");
bookTitle.classList.add(
  "candyDoc__runningFooterBookTitle",
  "candyDoc__runningFooterTool"
);
bookTitle.innerText = "Book Title";
bookTitle.addEventListener("mousedown", () => {
  const bookTitleBox = document.createElement("div");
  bookTitleBox.innerText = document.title;
  bookTitleBox.contentEditable = "true";
  bookTitleBox.addEventListener("keydown", (e) => e.preventDefault());
  bookTitleBox.classList.add("candyDoc__runningFooterBox","candyDoc__runningFooterBookTitleTextBox")
  const boxWrapperClone = boxWrapper.cloneNode(true);
  boxWrapperClone.append(bookTitleBox);
  editor.append(boxWrapperClone);
});
