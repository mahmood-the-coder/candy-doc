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
import { getInspector } from "../inspector/index.js";
import { getInspectorShapesTools } from "../inspector/shapes-tools/index.js";
import { wrapper } from "./elements/wrapper.js";
export function insertShape() {
  const wrapperClone = wrapper.cloneNode(true);

  insert(wrapperClone);
}

window.addEventListener("load", () => {
  window.addEventListener("mousedown", (e) => {
    if(!findAncestor(e.target,"candyDoc__shapeWrapper"))return;
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    inspector.append(
      getInspectorShapesTools(),
      getAlignInspectorTools(),
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
  
});
