export function getBorderImageWidth(target) {
    if(!(target instanceof Element))return "0"
    return getComputedStyle(target)?.borderImageWidth.split(" ")
    
  
}
