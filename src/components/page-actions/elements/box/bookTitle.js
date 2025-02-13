import { boxWrapper } from "./boxWrapper.js";

export const bookTitle = document.createElement("div");
bookTitle.classList.add(
  "candyDoc__pageActionsBookTitle",
  "candyDoc__pageActionsTool"
);
bookTitle.innerText = "Book Title";
bookTitle.addEventListener("mousedown", () => {
  const bookTitleBox = document.createElement("div");
  bookTitleBox.innerText = document.title;
  bookTitleBox.contentEditable = "true";
  bookTitleBox.addEventListener("keydown", (e) => e.preventDefault());
  bookTitleBox.classList.add("candyDoc__pageActionsBox","candyDoc__pageActionsBookTitleTextBox","target")
  const boxWrapperClone = boxWrapper.cloneNode(true);
  boxWrapperClone.append(bookTitleBox);
});
