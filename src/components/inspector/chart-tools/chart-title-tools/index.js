import { titleAlign } from "./elements/align.js";
import { titleColor } from "./elements/color.js";
import { titleFontSize } from "./elements/fontSize.js";
import { titleFontWeight } from "./elements/fontWeight.js";
import { titleText } from "./elements/text.js";
import { wrapper } from "./elements/wrapper.js";

export function getInspectorChartTitle()
{
    return wrapper
}

export function resetChartTitle()
{
    titleColor.querySelector("input").value="#000000"
    titleColor.querySelector("input").style.color="#000000"
    titleColor.querySelector("input").style.backgroundColor="#000000"

    titleAlign.querySelectorAll("input").forEach(i=>{
        i.checked=false;

    })
    titleFontSize.querySelector("input").value="16"
    titleFontWeight.querySelector("input").value="500"
    titleText.querySelector("input").value="Chart Title"
}