import { findAncestor } from "../find-ancestor/index.js";
import { getAlignInspectorTools } from "../inspector/align-tools/index.js";
import { getInspectorBackgroundTools } from "../inspector/background-image-tools/index.js";
import { getInspectorBackgroundRepeatTools } from "../inspector/background-repeat-tools/index.js";
import { getInspectorBackgroundSizeTools } from "../inspector/background-size-tools/index.js";
import { getInspector } from "../inspector/index.js";
import { getInspectorTransformTools } from "../inspector/transform-tools/index.js";
export const nodeWrapper = document.createElement("div");
nodeWrapper.classList.add("candyDoc__diagramNodeWrapper","candyDoc__diagramNode");

const pointTop=document.createElement("div");
pointTop.classList.add("candyDoc__diagramNodePoint","pointTop");
const pointLeft=document.createElement("div");
pointLeft.classList.add("candyDoc__diagramNodePoint","pointLeft");
const pointRight=document.createElement("div");
pointRight.classList.add("candyDoc__diagramNodePoint","pointRight");
const pointBottom=document.createElement("div");
pointBottom.classList.add("candyDoc__diagramNodePoint","pointBottom");
nodeWrapper.append(pointTop,pointRight,pointLeft,pointBottom)


function addNodeTools() {
  const inspector = getInspector();
  const scrollTop = inspector.scrollTop;
  inspector.innerHTML = "";

  inspector().append(
    getInspectorTransformTools(),
    getAlignInspectorTools(),
    getInspectorBackgroundTools(),
    getInspectorBackgroundSizeTools(),
    getInspectorBackgroundRepeatTools()
  );
  inspector.scrollTop = scrollTop;
}

window.addEventListener("reload",()=>{
  window.addEventListener("mousedown", (e) => {
     if(!findAncestor(e.target,"candyDoc__diagramNodeWrapper"))return;
     addNodeTools()
  });
})

export function createNodeWrapper()
{
  const clone=nodeWrapper.cloneNode(true)
  clone.dataset.node="node__"+Date.now().toString(16)
  clone.querySelectorAll(".candyDoc__diagramNodePoint").forEach(p=>{
    p.dataset.point="point__"+Math.random().toString(16)
  })
  return clone;
}