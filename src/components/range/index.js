export function getRange() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount <= 0) return null;
  const range = selection.getRangeAt(0);
  return range;
}

export function getRangeParent(range) {
  return getRangeElement(range).parentElement;
}
export function getRangeElement(range) {

  const element =
    range.startContainer.nodeType != Node.TEXT_NODE
      ? range.startContainer
      : range.startContainer.parentElement;

  return element;
}
