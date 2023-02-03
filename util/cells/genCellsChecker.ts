const genCellsChecker = () => {
  let cells = Array(21).fill(false)
  let cellsOn = 0
  const checkeredCells: boolean[] = cells.map((c, i) => {
    if (i % 2 === 0) {
      if (Math.random() >= 0.8) {
        return false
      } else {
        cellsOn = cellsOn + 1
        // If on the 11th cell make sure power is off
        // Or else, there would be nothing to solve.
        if (cellsOn < 11) return true
        else return false
      }
    }

    return false
  })
  return checkeredCells
}

export default genCellsChecker
