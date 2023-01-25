const genCellsOn = () => {
  let cellsOn = Array(21).fill(true)

  // Turn off up to 5 random cells
  for (let i = 0; i < 5; i++) {
    const randCell = Math.floor(Math.random() * 21)
    cellsOn[randCell] = false
  }

  return cellsOn
}

export default genCellsOn
