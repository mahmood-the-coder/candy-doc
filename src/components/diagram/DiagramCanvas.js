import { findAncestor } from "../find-ancestor/index.js";
import { getCurrentDiagram } from "./Diagram.js";

let start = false;
export function setStartRender(startRender) {
    start = startRender;
}
export function initDiagramCanvas() {
    getLines(getCurrentDiagram());
    window.addEventListener("mousedown", (e) => {
        const diagram=findAncestor(e.target,"candyDoc__diagramWrapper")
        if(diagram)
        start = true
    });
    window.addEventListener("mouseup", () => { 
        start = false 
    });
    render();
}


function getLines(diagram) {
    let lines = [];
    try {
        lines = JSON.parse(diagram.dataset.lines);
    } catch (error) {
        diagram.dataset.lines = "[]";
    }
    return lines;
}

function render() {
    requestAnimationFrame(render);
    if (!start) return;
    const diagram = getCurrentDiagram();
    const lines= getLines(diagram);
    const context = getCurrentDiagram().querySelector("canvas").getContext("2d");
    context.clearRect(0, 0, getCurrentDiagram().offsetWidth, getCurrentDiagram().offsetHeight);

    lines.forEach((line) => {
        const point = diagram.querySelector(`.candyDoc__diagramToPoint[data-id="${line.id}"]`);
        if (point)
            drawLine(line, context);
    });

    return lines;
}

function drawLine(line, context) {
    
    // Start a new Path
    context.beginPath();
    context.moveTo(line.from.x, line.from.y);
    const offset = 20
    if (line.origin == "top") {

        
        context.lineTo(line.from.x, line.from.y - offset);
    }
    if (line.origin == "bottom") {

        
        context.lineTo(line.from.x, line.from.y + offset);
    }
    if (line.origin == "left") {
        
        context.lineTo(line.from.x + offset, line.from.y);
    }
    if (line.origin == "right") {
       
        context.lineTo(line.from.x - offset, line.from.y);

    }

  
    
        if (line.end == "right") {
            context.lineTo(line.to.x - offset, line.to.y);
        }
        if (line.end == "left") {
            context.lineTo(line.to.x + offset, line.to.y);
        }
        if (line.end == "bottom") {
            context.lineTo(line.to.x, line.to.y + offset);
        }
        if (line.end == "top") {
            context.lineTo(line.to.x, line.to.y - offset);
        }
    
   

  
    context.lineTo(line.to.x, line.to.y);

    context.strokeStyle = line.color;
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 3;
    context.stroke();
    
}
