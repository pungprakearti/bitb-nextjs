const genCellsColumn = () => {
  let cells = Array(21).fill(false)
  let columnCells = [1, 3, 5, 8, 10, 12, 15, 17, 19]

  for (let i = 0; i < 3; i++) {
    const randCell = Math.floor(Math.random() * columnCells.length)
    columnCells.splice(randCell, 1)
  }

  for (let cell of columnCells) {
    cells[cell] = true
  }

  return cells
}

export default genCellsColumn
