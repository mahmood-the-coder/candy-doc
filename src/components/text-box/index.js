import { findAncestor } from "../find-ancestor/index.js";
import { addHistory } from "../history-stack/index.js";
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
import { saveEditorData } from "../editor-js/index.js";
import { BackColorTool, ForeColorTool } from "../editor-js-color/index.js"
import { FontTool } from "../editor-js-font/index.js";

export function insertTextBox() {
  const clone = textBoxWrapper.cloneNode(true);
  clone.id = "textBox__" + Date.now().toString(16);
  insert(clone);
  const editor = new EditorJS({
    holder: clone.querySelector(".candyDoc__textBox"),
    placeholder: 'Type...',
    tools: {
      header: {
        class: Header,
        inlineToolbar: true, // Inline formatting (e.g., bold, italic)
        config: {
          placeholder: 'Enter a header',
          levels: [1, 2, 3], // Header levels (H1, H2, H3)
          defaultLevel: 2
        }
      },
      list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered' // Default list style (unordered or ordered)
        }
      },
      code: CodeTool,
      color: {
        class: ForeColorTool,
        shortcut: 'CMD+SHIFT+C',
      },
      marker: {
        class: BackColorTool,
        shortcut: 'CTRL+ALT+H',
      },
      font:{
        class:FontTool,
        
      }
    },
    onChange: () => saveEditorData(editor, clone.id)
  })






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
  let lastCapture = null;
  window.addEventListener("keyup", (e) => {
    if (!e.target.classList.contains("candyDoc__textBox")) return;

    const currentCapture = e.target.innerHTML;
    if (lastCapture == currentCapture) return;
    addHistory();
  });


});

