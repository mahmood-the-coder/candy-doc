import { getCurrentContent } from "./currentContent.js";
export function insert(element) {
  const content = getCurrentContent();
  const cursor = document.body.querySelector(".candyDoc__cursor");
  const cursorRect = cursor.getBoundingClientRect();
  let left;
  let top;

  if (cursor.offsetLeft <= (cursor.parentElement.getBoundingClientRect().width / 2)) {
    left = cursorRect.x - content.getBoundingClientRect().x + (cursor.offsetWidth / 2)

  }
  else {
    left = (cursorRect.x - content.getBoundingClientRect().x + (cursor.offsetWidth / 2)) - 250
  }

  top = cursorRect.y - content.getBoundingClientRect().y + (cursor.offsetHeight / 2)

  if (cursor.offsetTop <= (cursor.parentElement.getBoundingClientRect().height / 2)) {
    top = cursorRect.y - content.getBoundingClientRect().y + (cursor.offsetHeight / 2)

  }
  else {
    top = (cursorRect.y - content.getBoundingClientRect().y + (cursor.offsetHeight / 2)) - 100
  }
  if (!content) return;



  content.append(element);

  element.style.position = "absolute"
  element.style.left = left + "px"
  element.style.top = top + "px"
  element.style.zIndex = "100"
  element.style.width = "250px"
  element.style.height = "100px"
  
}
