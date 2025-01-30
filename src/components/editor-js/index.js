import { BackColorTool, ForeColorTool } from "../editor-js-color/index.js";
export function saveEditorData(editor, id) {
    editor.save().then((data) => {
        const textBox = document.getElementById(id);
        textBox.dataset.blocks = JSON.stringify(data); // Save valid JSON
        console.log("Saved data:", data); // Debugging
    }).catch((error) => {
        console.error('Saving failed: ', error);
    });
}

export function initEditorJS() {
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.body.querySelectorAll(".candyDoc__textBox").forEach((tb) => {
                tb.innerHTML = ""; // Clear existing content
                let editorData;
                try {
                    editorData = JSON.parse(tb?.parentElement?.dataset?.blocks);
                } catch (e) {
                    console.error("Invalid data format. Using default.", e);
                    editorData = { blocks: [] }; // Default fallback
                }

                const editor = new EditorJS({
                    holder: tb,
                    data: editorData,
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
                        color: {
                            class: BackColorTool,
                            shortcut: 'CTRL+ALT+H',
                        },
                      
                    },
                    onChange: () => saveEditorData(editor, tb.parentElement.id),
                });
            });
        }, 10);
    });
}

  