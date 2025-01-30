export function initToolTip() {
    const OFFSET = 10;
    const tooltip = document.createElement("div");
    tooltip.classList.add("candyDoc__tooltip");
    
    window.addEventListener("mousemove", (e) => {
        const tooltipText = e.target?.dataset?.tooltip ?? null;
        
        if (!tooltipText) {
            tooltip?.remove();
            return;
        }

        tooltip.innerText = tooltipText;

        if (!document.body.contains(tooltip)) {
            document.body.append(tooltip);
        }

        // Get the viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the desired position
        let tooltipX = e.clientX + OFFSET;
        let tooltipY = e.clientY + OFFSET;

        // Get the tooltip dimensions
        const tooltipRect = tooltip.getBoundingClientRect();

        // Adjust position to ensure the tooltip stays within the viewport
        if (tooltipX + tooltipRect.width > viewportWidth) {
            tooltipX = e.clientX - tooltipRect.width - OFFSET;
        }
        if (tooltipY + tooltipRect.height > viewportHeight) {
            tooltipY = e.clientY - tooltipRect.height - OFFSET;
        }

        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
    });
}
