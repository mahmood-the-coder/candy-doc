import { boxWrapper } from "./boxWrapper.js";

export const relativeNumber = document.createElement("div");
relativeNumber.classList.add(
  "candyDoc__pageActionsRelativeNumber",
  "candyDoc__pageActionsTool"
);
relativeNumber.innerText = "Relative Page Number";
relativeNumber.addEventListener("mousedown", () => {
  const relativeNumberBox = document.createElement("div");
  const page =
    document.body.querySelector(".candyDoc__cursor").parentElement
      .parentElement;
  if (!page) return;
  const relativeIndex = page.dataset.relativeIndex;
  relativeNumberBox.innerText = (parseInt(relativeIndex) + 1).toString();
  relativeNumberBox.contentEditable = "true";
  relativeNumberBox.addEventListener("keydown", (e) => e.preventDefault());
  relativeNumberBox.classList.add("candyDoc__pageActionsBox","target");
  const boxWrapperClone = boxWrapper.cloneNode(true);
  boxWrapperClone.append(relativeNumberBox);
});
