import { getSelected, getSelectedElements } from "../../selection/index.js";
import { center } from "./elements/center.js";
import { left } from "./elements/left.js";
import { right } from "./elements/right.js";
import { wrapper } from "./elements/wrapper.js";
export function getAlignInspectorTools() {
  
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  const selectedElements=getSelectedElements()
  
  const selected=selectedElements[selectedElements.length-1]
  if (!selected )return;
  
  center.classList.remove("candyDoc__toggleIcon");
  left.classList.remove("candyDoc__toggleIcon");
  right.classList.remove("candyDoc__toggleIcon");
  
  if (selected.offsetLeft ==selected?.parentElement?.offsetWidth-selected.offsetLeft-selected.offsetWidth ) {
    center.classList.add("candyDoc__toggleIcon");
  } else if (selected.offsetLeft <= 0) {
    left.classList.add("candyDoc__toggleIcon");
  }
  else if( (selected.offsetLeft+selected.offsetWidth)-selected?.parentElement?.offsetWidth <= 0)
  {
    right.classList.add("candyDoc__toggleIcon");
  }
});

