import { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './HWPanel.module.scss'

type Props = {
  handleMainPower: Function
  addEnergy: Function
}
type Dir = 'UP' | 'LEFT' | 'LFDN' | 'RGHT'
type CurDir = Dir | ''
type DirPower = Record<Dir, number>

const HWPanel: React.FC<Props> = ({ handleMainPower, addEnergy }) => {
  const initDirPower: DirPower = {
    UP: 0,
    LEFT: 0,
    LFDN: 0,
    RGHT: 0,
  }

  const initCellPower = [...Array(21).fill(false)]

  const initDirTracker = {
    UP: false,
    LEFT: false,
    LFDN: false,
    RGHT: false,
  }

  const [mainPower, setMainPower] = useState(false)
  const [dirPower, setDirPower] = useState<DirPower>(initDirPower)
  const [cellPower, setCellPower] = useState(initCellPower)
  const [dirTracker, setDirTracker] = useState(initDirTracker)
  const [curDir, setCurDir] = useState<CurDir>('')
  const [radioPower, setRadioPower] = useState(false)

  useEffect(() => {
    // If all cells are off while using a direction, turn off that direction
    if (mainPower && !cellPower.includes(true)) {
      setDirPower({
        ...dirPower,
        [curDir]: 0,
      })
      setDirTracker({
        ...dirTracker,
        [curDir]: true,
      })
      // Add energy when cells turned off
      addEnergy(Math.floor(Math.random() * 4) + 22)
    }
  }, [cellPower])

  // Main power for all hardware
  const handlePower = (turnOn: boolean) => {
    if (!mainPower) {
      if (turnOn) {
        setMainPower(true)
        setDirPower({
          UP: 0.5,
          LEFT: 0.5,
          LFDN: 0.5,
          RGHT: 0.5,
        })
        return handleMainPower(true)
      }
    } else {
      if (turnOn) return
    }

    // When powered off, restart everything
    setMainPower(false)
    setDirPower(initDirPower)
    setCellPower(initCellPower)
    setDirTracker(initDirTracker)
    setCurDir('')
    return handleMainPower(false)
  }

  // Handle clicks on directional buttons
  // Turns on cells to power off
  const handleDirPower = (dir: Dir) => {
    // Don't allow power to direction buttons if main power is off
    // Do not turn on again if all cells turned off
    // Don't react if same button clicked again
    if (!mainPower || dirTracker[dir] || curDir === dir) return

    // Track current direction button in state
    setCurDir(dir)

    // Turn on button light and dim other directions
    setDirPower({
      UP: dirTracker.UP ? 0 : 0.5,
      LEFT: dirTracker.LEFT ? 0 : 0.5,
      LFDN: dirTracker.LFDN ? 0 : 0.5,
      RGHT: dirTracker.RGHT ? 0 : 0.5,
      [dir]: 1,
    })

    // Randomize powered cell buttons
    let randCells: number[] = []
    while (randCells.length < Math.ceil(Math.random() * 10) + 2) {
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

  const handleRadioPower = (turnOn: boolean) => {
    if (turnOn) setRadioPower(true)
    else setRadioPower(false)
  }

  // Create directional elements
  let dirEls: JSX.Element[] = []
  const dirNames: Dir[] = ['UP', 'LEFT', 'LFDN', 'RGHT']
  dirNames.forEach((dir) => {
    dirEls.push(
      <button
        className={cx(
          { [styles.dim]: dirPower[dir] === 0.5 },
          { [styles.on]: dirPower[dir] === 1 }
        )}
        onClick={() => handleDirPower(dir)}
        key={dir}
      >
        {dir}
      </button>
    )
  })

  // Create cells element
  let cellsEl = []
  for (let cell = 0; cell < cellPower.length; cell++) {
    cellsEl.push(
      <button
        className={cx({ [styles.on]: cellPower[cell] })}
        onClick={() => handleCellClick(cell)}
        key={cell}
      >
        {cell}
      </button>
    )
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
      <div className={styles.direction}>{dirEls}</div>
      <div className={styles.center}>{cellsEl}</div>
      <div className={styles.radio}>
        <div className={styles.radioLeft}>
          <button onClick={() => handleRadioPower(true)}>1</button>
          <button onClick={() => handleRadioPower(false)}>0</button>
        </div>
        <div className={cx(styles.screen, { [styles.on]: radioPower })}>
          Radio
        </div>
      </div>
    </div>
  )
}

export default HWPanel
