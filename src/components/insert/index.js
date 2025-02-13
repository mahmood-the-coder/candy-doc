import { getCenterLayoutElement } from "../layout/index.js";
import { getCurrentContent } from "./currentContent.js";
export function insert(element) {
  const content = getCurrentContent();
  const cursor=document.body.querySelector(".candyDoc__cursor");
  const left=cursor.getBoundingClientRect().x - content.getBoundingClientRect().x +(cursor.offsetWidth/2)
  const top=cursor.getBoundingClientRect().y - content.getBoundingClientRect().y+(cursor.offsetHeight/2)
  
  
  if (!content) return;
  content.append(element);
  element.style.position="absolute"
  element.style.left=left+"px"
  element.style.top=top+"px"
  element.style.zIndex="100"
  
}
