import { menu } from "./elements/menu.js";
import { wrapper } from "./elements/wrapper.js";

export function getPreference()
{
    return wrapper
}


window.addEventListener("mousedown",(e)=>{
    if(wrapper.contains(e.target))return;
    menu.style.display="none"  
})