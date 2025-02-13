import { getSelected, getSelectedElements } from "../../selection/index.js";
import { getInspector } from "../index.js";
import { round } from "./elements/round.js";
import { rounded } from "./elements/rounded.js";
import { sharp } from "./elements/sharp.js";
import { wrapper } from "./elements/wrapper.js";
export function getInspectorBorderRadiusTools() {
  const selected = getSelected();
  if (!selected) return wrapper;
  sharp.classList.remove("candyDoc__toggleIcon")
  round.classList.remove("candyDoc__toggleIcon")
  rounded.classList.remove("candyDoc__toggleIcon")
  if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "3px") {
    sharp.classList.add("candyDoc__toggleIcon");
  } else if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "16px") {
    rounded.classList.add("candyDoc__toggleIcon")
  } else if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "50%") {
    round.classList.add("candyDoc__toggleIcon")
  }
  else {
    sharp?.classList?.add("candyDoc__toggleIcon");
  }
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  if (getInspector().contains(e.target)) return;
  const selectedElements = getSelectedElements()
  const selected = selectedElements[selectedElements.length - 1]
  if (!selected) return;
  sharp?.classList?.remove("candyDoc__toggleIcon")
  round?.classList?.remove("candyDoc__toggleIcon")
  rounded?.classList?.remove("candyDoc__toggleIcon")
  if (!(selected?.querySelector)) return
  if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "3px") {
    sharp.classList.add("candyDoc__toggleIcon");
  } else if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "16px") {
    rounded.classList.add("candyDoc__toggleIcon")
  } else if (selected?.querySelector(".target")?.style?.getPropertyValue("border-radius") == "50%") {
    round.classList.add("candyDoc__toggleIcon")
  }
  else {
    sharp?.classList?.add("candyDoc__toggleIcon");
  }
});
