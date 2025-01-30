export function getElementsBetween(element1, element2) {
    // Ensure the provided elements are valid and in the same container
    if (!element1 || !element2 || element1 === element2) {
        return [];
    }

    // Determine the direction of traversal
    let startElement = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_PRECEDING
        ? element2
        : element1;

    let endElement = startElement === element1 ? element2 : element1;

    let current = startElement.nextElementSibling; // Start with the next sibling of the starting element
    const elementsBetween = [];

    // Traverse until we reach the end element
    while (current && current !== endElement) {
        elementsBetween.push(current);
        current = current.nextElementSibling;
    }

    return elementsBetween;
}