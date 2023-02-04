const valCellsColumn = (cells: boolean[]) => {
  const columnCells = [1, 3, 5, 8, 10, 12, 15, 17, 19]

  for (let i = 0; i < cells.length; i++) {
    if (columnCells.includes(i)) {
      if (!cells[i]) return
    } else {
      if (cells[i]) return
    }
  }

  return true
}

export default valCellsColumn
