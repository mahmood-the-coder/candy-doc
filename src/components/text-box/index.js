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
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
import { textBoxWrapper } from "./elements/wrapper.js";


export function insertTextBox() {
  const clone = textBoxWrapper.cloneNode(true);
  clone.id = "textBox__" + Date.now().toString(16);
  
  insert(clone);

 
  





}
function addInspectorTools() {
  window.addEventListener("mousedown", (e) => {
    if (!findAncestor(e.target, "candyDoc__textBoxWrapper")) return;

    if (e.target.classList.contains("candyDoc__textBlock")) return;
    const inspector = getInspector();
    const scrollTop = inspector.scrollTop;
    inspector.innerHTML = "";
    getInspector().append(
      getInspectorTransformTools(),
      getAlignInspectorTools(),
      getInspectorBorderTools(),
      getInspectorBorderColorTools(),
      getInspectorBorderRadiusTools(),
      getInspectorBorderWidthTools(),
      getInspectorBackgroundTools(),
      getInspectorBackgroundSizeTools(),
      getInspectorBackgroundRepeatTools(),
      getInspectorBorderImageTools()
    );
    inspector.scrollTop = scrollTop;
  });
}


window.addEventListener("load", () => {
  addInspectorTools();
});

