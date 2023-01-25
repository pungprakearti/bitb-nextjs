const genCellsOFF = () => {
  let cellsOff = Array(21).fill(false)

  // Turn on up to 5 random cells
  for (let i = 0; i < 5; i++) {
    const randCell = Math.floor(Math.random() * 21)
    cellsOff[randCell] = true
  }

  return cellsOff
}

export default genCellsOFF
