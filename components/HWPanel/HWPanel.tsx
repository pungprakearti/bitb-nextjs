import { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './HWPanel.module.scss'

type Props = {
  handleMainPower: Function
}

type CurDir = 'dirUp' | 'dirLeft' | 'dirLeftDown' | 'dirRight' | ''

const HWPanel: React.FC<Props> = ({ handleMainPower }) => {
  const initDirPower = {
    dirUp: 0,
    dirLeft: 0,
    dirLeftDown: 0,
    dirRight: 0,
  }

  const initCellPower = [...Array(21).fill(false)]

  const initDirTracker = {
    dirUp: false,
    dirLeft: false,
    dirLeftDown: false,
    dirRight: false,
  }

  const [mainPower, setMainPower] = useState(false)
  const [dirPower, setDirPower] = useState(initDirPower)
  const [cellPower, setCellPower] = useState(initCellPower)
  const [dirTracker, setDirTracker] = useState(initDirTracker)
  const [curDir, setCurDir] = useState<CurDir>('')

  useEffect(() => {
    // If all cells are off while using a direction, turn off that direction
    if (!cellPower.includes(true)) {
      setDirPower({
        ...dirPower,
        [curDir]: 0,
      })
      setDirTracker({
        ...dirTracker,
        [curDir]: true,
      })
    }
  }, [cellPower])

  // Main power for all hardware
  const handlePower = (turnOn: boolean) => {
    if (turnOn) {
      setMainPower(true)
      setDirPower({
        dirUp: 0.5,
        dirLeft: 0.5,
        dirLeftDown: 0.5,
        dirRight: 0.5,
      })
      return handleMainPower(true)
    }

    // When powered off, restart everything
    setMainPower(false)
    setDirPower(initDirPower)
    setCellPower(initCellPower)
    setDirTracker(initDirTracker)
    setCurDir('')
    return handleMainPower(false)
  }

  const handleDirPower = (
    dir: 'dirUp' | 'dirLeft' | 'dirLeftDown' | 'dirRight'
  ) => {
    // Don't allow power to direction buttons if main power is off
    if (!mainPower) return

    // Do not turn on again if all cells turned off
    if (dirTracker[dir]) return

    // Track current direction button in state
    setCurDir(dir)

    // Turn on button light and dim other directions
    setDirPower({
      dirUp: dirTracker.dirUp ? 0 : 0.5,
      dirLeft: dirTracker.dirLeft ? 0 : 0.5,
      dirLeftDown: dirTracker.dirLeftDown ? 0 : 0.5,
      dirRight: dirTracker.dirRight ? 0 : 0.5,
      [dir]: 1,
    })

    // Randomize powered cell buttons
    let randCells: number[] = []
    while (randCells.length < Math.ceil(Math.random() * 10)) {
      const randCell = Math.floor(Math.random() * 21)
      if (!randCells.includes(randCell)) {
        randCells.push(randCell)
      }
    }

    // Assign power to cells
    let tempCellPower = []
    for (let cell = 0; cell < cellPower.length; cell++) {
      if (randCells.includes(cell)) tempCellPower.push(true)
      else tempCellPower.push(false)
    }
    setCellPower(tempCellPower)
  }

  const handleCellClick = (cell: number) => {
    // If all cells are off, don't allow any to be turned on
    if (!cellPower.includes(true)) return

    let tempCellPower = [...cellPower]
    tempCellPower[cell] = !tempCellPower[cell]
    setCellPower(tempCellPower)
  }

  // Create cells element
  let cellsEl = []
  for (let cell = 0; cell < cellPower.length; cell++) {
    if (cellPower[cell]) {
      cellsEl.push(
        <button
          className={styles.on}
          onClick={() => handleCellClick(cell)}
          key={cell}
        >
          {cell}
        </button>
      )
    } else {
      cellsEl.push(
        <button onClick={() => handleCellClick(cell)} key={cell}>
          {cell}
        </button>
      )
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.power}>
        <button
          className={cx(
            { [styles.dim]: !mainPower },
            { [styles.on]: mainPower }
          )}
          onClick={() => handlePower(true)}
        >
          1
        </button>
        <button onClick={() => handlePower(false)}>0</button>
      </div>
      <div className={styles.direction}>
        <button
          className={cx(
            { [styles.dim]: dirPower.dirUp === 0.5 },
            { [styles.on]: dirPower.dirUp === 1 }
          )}
          onClick={() => handleDirPower('dirUp')}
        >
          UP
        </button>
        <button
          className={cx(
            { [styles.dim]: dirPower.dirLeft === 0.5 },
            { [styles.on]: dirPower.dirLeft === 1 }
          )}
          onClick={() => handleDirPower('dirLeft')}
        >
          LEFT
        </button>
        <button
          className={cx(
            { [styles.dim]: dirPower.dirLeftDown === 0.5 },
            { [styles.on]: dirPower.dirLeftDown === 1 }
          )}
          onClick={() => handleDirPower('dirLeftDown')}
        >
          LFDN
        </button>
        <button
          className={cx(
            { [styles.dim]: dirPower.dirRight === 0.5 },
            { [styles.on]: dirPower.dirRight === 1 }
          )}
          onClick={() => handleDirPower('dirRight')}
        >
          RGHT
        </button>
      </div>
      <div className={styles.center}>{cellsEl}</div>
      <div className={styles.radio}>
        <div className={styles.radioLeft}>
          <button>1</button>
          <button>0</button>
        </div>
        <div className={styles.screen}>Radio</div>
      </div>
    </div>
  )
}

export default HWPanel
