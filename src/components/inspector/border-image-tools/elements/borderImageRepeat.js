

export function getBorderImageRepeat(target)
{
    if(!(target instanceof Element))return
    return window.getComputedStyle(target).borderImageRepeat;
}