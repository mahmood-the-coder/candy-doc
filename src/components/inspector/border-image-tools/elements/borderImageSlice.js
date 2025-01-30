export const borderImageSlice=["30","30","30","30"]

export function getBorderImageSlice(target)
{  
    if(!(target instanceof Element))return "0"
    
    return getComputedStyle(target).borderImageSlice.split(" ").map(s=>s.replace("%","").replace("px",""))
}