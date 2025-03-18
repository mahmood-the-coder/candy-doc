import { getCenterLayoutElement } from "../../../layout/index.js";
import { getSelected } from "../../../selection/index.js";
import { addChartBarBackgroundColors } from "./elements/barBackgroundColors/barBackgroundColors.js";
import { initInspectorChartBackgroundBarColorsColorsDrag } from "./elements/barBackgroundColors/drag.js";
import { addChartBoxPlotColors } from "./elements/boxPlotColors/boxPlotColors.js";
import { addChartOptionsColors } from "./elements/colors/colors.js";
import { initInspectorChartOptionsColorsDrag } from "./elements/colors/drag.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorChartColorTools() {

    return wrapper;
}

window.addEventListener("mouseup", (e) => {
    if (!getCenterLayoutElement().contains(e.target)) return;
     initInspectorChartBackgroundBarColorsColorsDrag();
     initInspectorChartOptionsColorsDrag()
    renderColors(getSelected())
})

export function renderColors(selected) {

    const options = JSON.parse(selected?.dataset?.chartOptions ?? "null")
    if (!options) return;
    const background = wrapper.querySelector(".barBackground")
    if (background)
        background.style.display = "none"
    const boxPlot = wrapper.querySelector(".boxPlot");
        if (boxPlot)
            boxPlot.style.display = "none"
    const colors = wrapper.querySelector(".colors");
        if (colors)
            colors.style.display = "none"
    if (options.chart.type == "line" ||
        options.chart.type == "area" ||
        options.chart.type == "rangeArea" ||
        options.chart.type == "rangeBar" ||
        options.chart.type == "radar" 
    ) {
        const colors = wrapper.querySelector(".colors");
        if (colors)
            colors.style.display = "flex"
       
    
            const copy = [...options.colors].splice(0,options.series.length)
            
            
            addChartOptionsColors(copy, true)
        
       
        return;
    }

    if (options.chart.type == "bar") {
        const background = wrapper.querySelector(".barBackground")
        if (background)
            background.style.display = "flex"
        const colors = wrapper.querySelector(".colors");
        if (colors)
            colors.style.display = "flex"
        addChartBarBackgroundColors(options.plotOptions.bar.colors.backgroundBarColors)
        addChartOptionsColors(options.colors, true)
        const add = wrapper.querySelector(".colorsAdd");
        if (add)
            add.style.display = "flex"
        return;
    }


    if (options.chart.type == "boxPlot" || options.chart.type == "candlestick") {
        const boxPlot = wrapper.querySelector(".boxPlot");
        if (boxPlot)
            boxPlot.style.display = "flex"
        addChartBoxPlotColors()
        const add = wrapper.querySelector(".colorsAdd");
        if (add)
            add.style.display = "flex"
        return;
    }
    const colorsEl = wrapper.querySelector(".colors");
    if (colorsEl)
        colorsEl.style.display = "flex"

    addChartOptionsColors(options.colors, true)


}