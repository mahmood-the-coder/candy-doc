export function isInside(container, target, percentage = 100) {
    // Calculate the target's width and height
    const targetWidth = target.right - target.left;
    const targetHeight = target.bottom - target.top;
    
    // Calculate the container's boundaries relative to the target
    const overlapLeft = Math.max(container.left, target.left);
    const overlapRight = Math.min(container.right, target.right);
    const overlapTop = Math.max(container.top, target.top);
    const overlapBottom = Math.min(container.bottom, target.bottom);
    
    // Calculate the overlapping width and height
    const overlapWidth = Math.max(0, overlapRight - overlapLeft);
    const overlapHeight = Math.max(0, overlapBottom - overlapTop);
    
    // Calculate the areas
    const targetArea = targetWidth * targetHeight;
    const overlapArea = overlapWidth * overlapHeight;
    
    // Calculate the percentage of overlap
    const overlapPercentage = (overlapArea / targetArea) * 100;
    
    // Return true if the overlap percentage meets or exceeds the specified percentage
    return overlapPercentage >= percentage;
}