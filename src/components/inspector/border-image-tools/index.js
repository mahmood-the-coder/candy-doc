import { load } from "../../DB/load.js";
import { closeModal } from "../../file-modal/index.js";
import { getSelected, getSelectedElements } from "../../selection/index.js";
import { getBorderImageRepeat } from "./elements/borderImageRepeat.js";
import { getBorderImageSlice } from "./elements/borderImageSlice.js";
import { getBorderImageWidth } from "./elements/borderImageWidth.js";
import { image } from "./elements/image.js";
import { outset } from "./elements/outset.js";
import { repeat } from "./elements/repeat.js";
import { slice } from "./elements/slice.js";
import { initSlicerDrag, slicer } from "./elements/slicer.js";
import { width } from "./elements/width.js";
import { wrapper } from "./elements/wrapper.js";
import { borderImage } from "../../base64/base64.js";
let isInitialized = false;
export function getInspectorBorderImageTools() {
  if (!isInitialized) {
    initSlicerDrag();
    isInitialized = true;
  }
  return wrapper;
}

window.addEventListener("mouseup", (e) => {
  const selectedElements=getSelectedElements();
  const selected = selectedElements[selectedElements.length-1]
  if (!selected) return;
  if (selected?.id != e?.target?.parentElement?.id) return;
      if(!(selected?.querySelector))return

  repeat.querySelectorAll("option").forEach((o, index) => {
    const currentValues = getBorderImageRepeat(
      selected.querySelector(".target")
    )?.split(" ");
    o.selected = "";
    if(o.value && currentValues && currentValues[index] )
    if (o.value == currentValues[index]) {
      o.selected = "selected";
    }
  });
  const borderImageWidth = getBorderImageWidth(
    selected.querySelector(".target")
  );
  width.querySelectorAll("input").forEach((i, index) => {
    i.value =
      borderImageWidth[index]?.replace("px", "") ??
      borderImageWidth[0].replace("px", "");
  });

  slice.querySelectorAll("input").forEach((s, index) => {
    s.value =
      getBorderImageSlice(selected.querySelector(".target"))[index] ??
      getBorderImageSlice(selected.querySelector(".target"))[0];
  });

  slicer.querySelectorAll(".candyDoc__slicerHandle").forEach((h, index) => {
    h.style[h.dataset.direction] = getBorderImageSlice(
      selected.querySelector(".target")
    )[index]
      ? getBorderImageSlice(selected.querySelector(".target"))[index] + "px"
      : getBorderImageSlice(selected.querySelector(".target"))[0] + "px";
  });
  if(!(selected?.querySelector(".target") instanceof Element))return;
  const outsetValue = window.getComputedStyle(
    selected?.querySelector(".target")
  ).borderImageOutset;
  outset.querySelector("input").value = outsetValue.replace("px", "");
  const imageSource = window.getComputedStyle(
    selected.querySelector(".target")
  ).borderImageSource;
  if (imageSource == "none") {

    image.querySelector("img").src =borderImage;
  } else if(selected.dataset.imageKey) {
    
    load(selected.dataset.imageKey)
    .then((data) => {
      const blobString = data.base64;
      if (blobString) {
        const byteCharacters = atob(blobString);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], {
          type: "image/" + selected.dataset.imageKey.split(".")[1],
        });

        const url = URL.createObjectURL(blob);

        function testImage(URL) {
          var tester = new Image();
          tester.onload = onImageFound;
          tester.onerror = onImageNotFound;
          tester.src = URL;
        }
        testImage(url || "");
        function onImageFound() {
          slicer.querySelector("img").src = url || "";
         
        }
        function onImageNotFound() {

          slicer.querySelector("img").src =borderImage;
         
        }

        setTimeout(() => {
          closeModal();
        }, 200);
      } else {

        slicer.querySelector("img").src = borderImage;
        console.error(
          "No Blob data found in localStorage for the given key: " + key
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
});

const toggle = document.createElement("div");
toggle.classList.add("candyDoc__inspectorToolsWrapperToggle", "candyDoc__icon")
toggle.innerHTML =/*html*/
`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M7 11H17V13H7V11Z" fill="var(--color)"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H2V22H22V2ZM20 4H4V20H20V4Z" fill="var(--color)"></path>
    </g>
  </svg>
`

wrapper.append(toggle) 
toggle.parentElement.style.height="40px"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="none")

toggle.addEventListener("mousedown",(e)=>{
    if(toggle.parentElement.offsetHeight>40)
    {
        toggle.parentElement.style.height="40px"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="none")
    }
    else
    {
        toggle.parentElement.style.height="auto"
        toggle.parentElement.querySelectorAll("div:not(.candyDoc__inspectorToolsWrapperToggle , .candyDoc__inspectorToolLabel)").forEach(div=>div.style.display="flex")
    }
 
})