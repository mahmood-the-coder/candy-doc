

export function applyTemplateRow(table) {
  table.querySelector(".candyDoc__table").style.gridTemplateRows =
    getTemplateRows(table).join(" ");
    table.dataset.gridTemplateRows=getTemplateRows(table).join(" ")
}
export function applyTemplateCol(table) {
  table.querySelector(".candyDoc__table").style.gridTemplateColumns =
    getTemplateCols(table).join(" ");
    table.dataset.gridTemplateColumns=getTemplateCols(table).join(" ")
}
export function insertTemplateRow(table,index, value) {
  const templateRows= [...getTemplateRows(table)];
  templateRows.splice(index, 0, value)
  table.dataset.gridTemplateRows=templateRows.join(" ")


}
export function removeTemplateRow(table) {
  const templateRows= [...getTemplateRows(table)];
  templateRows.pop()
  table.dataset.gridTemplateRows=templateRows.join(" ")
 

}
export function removeTemplateCol(table) {
  const templateCols= [...getTemplateCols(table)];
  templateCols.pop()
  table.dataset.gridTemplateColumns=templateCols.join(" ")
 

}
export function insertTemplateCol(table,index, value) {
  const templateCols= [...getTemplateCols(table)];
  templateCols.splice(index, 0, value)
  table.dataset.gridTemplateColumns=templateCols.join(" ")

}




export function getTemplateRows(table) {
  return table.dataset.gridTemplateRows.split(" ");
}

export function getTemplateCols(table) {
 return  table.dataset.gridTemplateColumns.split(" ");
}
