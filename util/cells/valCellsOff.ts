const valCellsOff = (cells: boolean[]) => {
  // If not all off and not 21 cells, return false
  if (cells.length !== 21) return false
  if (cells.includes(true)) return false

  return true
}

export default valCellsOff
