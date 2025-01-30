export function getMargin(target)
{
    let marginTop=getComputedStyle(target).marginTop
    let marginBottom=getComputedStyle(target).marginBottom
    return [marginBottom,marginTop]
    
}