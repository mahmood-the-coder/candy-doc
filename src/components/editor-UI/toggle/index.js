import { wrapper } from "./elements/wrapper.js";
export function getToggle(label = "", isOn = false) {
  const clone = wrapper.cloneNode(true);
  clone.querySelector(".label").innerText = label;
  clone.querySelector("input").checked = isOn;

  const handle = clone.querySelector(".handle");
  if (isOn) {
    handle.style.left = `calc(100% - 20px)`;
    clone.querySelector(".container").style.backgroundColor =
      "rgba(from var(--color) r g b / 0.6)";
  } else {
    handle.style.left = "0";
    clone.querySelector(".container").style.backgroundColor =
      "rgba(from var(--color) r g b / 0.3)";
  }
  clone.addEventListener("input", (e) => {
    const handle = clone.querySelector(".handle");
    if (clone.querySelector("input").checked) {
      handle.style.left = `calc(100% - ${handle.offsetWidth}px)`;
      clone.querySelector(".container").style.backgroundColor =
        "rgba(from var(--color) r g b / 0.6)";
    } else {
      handle.style.left = "0";
      clone.querySelector(".container").style.backgroundColor =
        "rgba(from var(--color) r g b / 0.3)";
    }
  });
  
 
  return clone;
}
export function setToggle(toggle,isOn)
{
  const handle = toggle.querySelector(".handle");
  if (isOn) {
    handle.style.left = `calc(100% - 20px)`;
    toggle.querySelector(".container").style.backgroundColor =
      "rgba(from var(--color) r g b / 0.6)";
  } else {
    handle.style.left = "0";
    toggle.querySelector(".container").style.backgroundColor =
      "rgba(from var(--color) r g b / 0.3)";
  }
}