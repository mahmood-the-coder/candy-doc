import { ForeColorTool, BackColorTool } from "../../../editor-js-color/index.js";
import { FontTool } from "../../../editor-js-font/index.js";
import { saveEditorData } from "../../../editor-js/index.js";
import { textBoxWrapper } from "../../../text-box/elements/wrapper.js";

export const absoluteNumber = document.createElement("div");
absoluteNumber.classList.add("candyDoc__pageActionsAbsoluteNumber","candyDoc__pageActionsTool");
absoluteNumber.innerText = "Absolute Page Number";
absoluteNumber.addEventListener("mousedown", async () => {
  const editor = document.body.querySelector(".candyDoc__pageActionsEditor");
  if (!editor) return;
  
  const page = editor.parentElement;
  if (!page) return;
  
  const absoluteIndex = page.dataset.index;

  const textBox = textBoxWrapper.cloneNode(true);
  const textBoxContainer = textBox.querySelector(".candyDoc__textBox");
  if (!textBoxContainer) {
    console.error("Text box container not found!");
    return;
  }

  const editorJS = new EditorJS({
    holder: textBoxContainer,
    placeholder: '',
    data: {
      blocks: [{
        id: String(Date.now()), // Unique string ID
        type: "paragraph",
        data: { text: (parseInt(absoluteIndex) + 1).toString() }
      }]
    },
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
        config: { placeholder: 'Enter a header', levels: [1, 2, 3], defaultLevel: 2 }
      },
      list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: { defaultStyle: 'unordered' }
      },
      code: CodeTool,
      color: { class: ForeColorTool, shortcut: 'CMD+SHIFT+C' },
      marker: { class: BackColorTool, shortcut: 'CTRL+ALT+H' },
      font: { class: FontTool }
    },
    async onReady() {
      console.log("EditorJS is ready!");
      editor.append(textBox);
    },
    onChange: () => saveEditorData(editor, textBox.id)
  });

  // Wait for the editor to initialize before appending
  await editorJS.isReady;
});
