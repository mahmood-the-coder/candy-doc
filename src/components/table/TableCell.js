
export function createTableCell(area, value, rowIdex, colIndex) {
  const cell = document.createElement("div");
  cell.classList.add("candyDoc__tableCell");
  cell.dataset.cellId = "tableCell__" + Date.now().toString(16);
  cell.id = "tableCell__" + (rowIdex + colIndex + Math.random()).toString(16);
  cell.dataset.expression = "";
  cell.dataset.transformation = "";
  cell.dataset.row = (rowIdex + 1).toString();
  cell.dataset.col = (colIndex + 1).toString();
  cell.style.gridArea = area;
  cell.style.borderTop="none"
  cell.style.borderLeft="none"
  cell.style.borderRight="none"
  cell.style.borderBottom="none"

  cell.contentEditable = "false";
  cell.draggable = false;

  const textBox=document.createElement("div");
  textBox.classList.add("candyDoc__tableCellTextBox")
  textBox.contentEditable=true;
  cell.dataset.name = textBox.dataset.name =
    String.fromCharCode(colIndex + 1 + 96).toUpperCase() + (rowIdex + 1);
  cell.append(textBox);
  textBox.dataset.value="0"
  return cell;
}

