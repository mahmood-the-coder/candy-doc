import { openFileModal } from "../file-modal/index.js";
import { findAncestor } from "../find-ancestor/index.js";
import { insert } from "../insert/index.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBackgroundTools } from "../inspector/background-image-tools/index.js";
import { getInspectorBackgroundRepeatTools } from "../inspector/background-repeat-tools/index.js";
import { getInspectorBackgroundSizeTools } from "../inspector/background-size-tools/index.js";
import { getInspectorBorderColorTools } from "../inspector/border-color-tools/index.js";
import { getInspectorBorderImageTools } from "../inspector/border-image-tools/index.js";
import { getInspectorBorderRadiusTools } from "../inspector/border-radius-tools/index.js";
import { getInspectorBorderTools } from "../inspector/border-tools/index.js";
import { getInspectorBorderWidthTools } from "../inspector/border-width-tools/index.js";
import { getInspectorImageSizeTools } from "../inspector/image-size-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { getSelected, getSelectedElements } from "../selection/index.js";
import { wrapper } from "./elements/wrapper.js";
export function insertImage() {
  openFileModal((image) => {
    insert(image)
  })
}
function addInspectorTools() {
  window.addEventListener("mouseup", (e) => {

    
    if (!e.target.classList.contains("candyDoc__imageWrapper") && !findAncestor(e.target,"candyDoc__imageWrapper")) return;
   
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    inspector.append(
      getInspectorTransformTools(),
      getAlignInspectorTools(),
      getInspectorImageSizeTools(),
      getInspectorBorderTools(),
      getInspectorBorderRadiusTools(),
      getInspectorBorderWidthTools(),
      getInspectorBorderColorTools(),
      getInspectorBackgroundTools(),
      getInspectorBackgroundSizeTools(),
      getInspectorBackgroundRepeatTools(),
      getInspectorBorderImageTools()
    );
    inspector.scrollTop = scrollTop;
  });

}


window.addEventListener("load", (e) => {

  addInspectorTools()
});

export function createImage(dataURL) {
  const wrapperClone = wrapper.cloneNode(true);
  wrapperClone.querySelector("img").src = dataURL;
  return wrapperClone;
}