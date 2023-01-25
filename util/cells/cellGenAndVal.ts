import genCellsChecker from './genCellsChecker'
import genCellsColumn from './genCellsColumn'
import genCellsOff from './genCellsOff'
import genCellsOn from './genCellsOn'
import valCellsChecker from './valCellsChecker'
import valCellsColumn from './valCellsColumn'
import valCellsOff from './valCellsOff'
import valCellsOn from './valCellsOn'

const cellGenAndVal = (
  type: 'off' | 'on' | 'checker' | 'column',
  cells: boolean[] = []
) => {
  // Validate
  if (cells.length) {
    switch (type) {
      case 'off': {
        return valCellsOff(cells)
      }
      case 'on': {
        return valCellsOn(cells)
      }
      case 'checker': {
        return valCellsChecker(cells)
      }
      default: {
        return valCellsColumn(cells)
      }
    }
  }

  // Generate
  switch (type) {
    case 'off': {
      return genCellsOff()
    }
    case 'on': {
      return genCellsOn()
    }
    case 'checker': {
      return genCellsChecker()
    }
    default: {
      return genCellsColumn()
    }
  }
}

export default cellGenAndVal
