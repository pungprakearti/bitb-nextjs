const valCellsChecker = (cells: boolean[]) => {
  for (let cell = 0; cell < cells.length; cell++) {
    // Fail if even cells are false or odd cells are even
    if (cell % 2 === 0 && cells[cell] === false) return false
    if (cell % 2 === 1 && cells[cell]) return false
  }

  return true
}

export default valCellsChecker
