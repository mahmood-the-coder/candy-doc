import { editor } from "../editor.js";
import { boxWrapper } from "./boxWrapper.js";

export const bookTitle = document.createElement("div");
bookTitle.classList.add(
  "candyDoc__runningHeaderBookTitle",
  "candyDoc__runningHeaderTool"
);
bookTitle.innerText = "Book Title";
bookTitle.addEventListener("mousedown", () => {
  const bookTitleBox = document.createElement("div");
  bookTitleBox.innerText = document.title;
  bookTitleBox.contentEditable = "true";
  bookTitleBox.addEventListener("keydown", (e) => e.preventDefault());
  bookTitleBox.classList.add("candyDoc__runningHeaderBox","candyDoc__runningHeaderBookTitleTextBox","target")
  const boxWrapperClone = boxWrapper.cloneNode(true);
  boxWrapperClone.append(bookTitleBox);
  editor.append(boxWrapperClone);
});
