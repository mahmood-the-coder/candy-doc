
export function tableSwap(table,cell, otherCell) {
 
  if ((isMerged(cell) || isMerged(otherCell)) && !isSameSize(cell, otherCell)) return;

  const temp = {
    gridArea: window.getComputedStyle(cell).gridArea,
    row: cell.dataset.row,
    col: cell.dataset.col,
    name: cell.dataset.name,
  };
  cell.style.gridArea = otherCell.style.getPropertyValue("grid-area");
  otherCell.style.gridArea = temp.gridArea;

  cell.dataset.row = otherCell.dataset.row;
  otherCell.dataset.row = temp.row;

  cell.dataset.name = otherCell.dataset.name;
  otherCell.dataset.name = temp.name;

  cell.dataset.col = otherCell.dataset.col;
  otherCell.dataset.col = temp.col;

 

  
}

function isSameSize(a, b) {
  return a.getBoundingClientRect().width - b.getBoundingClientRect().width<1 && a.getBoundingClientRect().height - b.getBoundingClientRect().height<1;
}


function isMerged(cell) {
  return cell.classList.contains("merged")
}
