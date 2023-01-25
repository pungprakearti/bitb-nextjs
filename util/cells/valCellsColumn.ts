const valCellsColumn = (cells: boolean[]) => {
  const columnCells = [1, 3, 5, 8, 10, 12, 15, 17, 19]

  for (let cell of columnCells) {
    if (!cells[cell]) return false
  }

  return true
}

export default valCellsColumn
