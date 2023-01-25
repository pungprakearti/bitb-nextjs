import { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import genCellsOff from '@/util/cells/genCellsOff'
import genCellsChecker from '@/util/cells/genCellsChecker'
import genCellsColumn from '@/util/cells/genCellsColumn'
import genCellsOn from '@/util/cells/genCellsOn'
import valCellsOff from '@/util/cells/valCellsOff'
import valCellsChecker from '@/util/cells/valCellsChecker'
import valCellsColumn from '@/util/cells/valCellsColumn'
import valCellsOn from '@/util/cells/valCellsOn'
import styles from './HWPanel.module.scss'

type Props = {
  handleMainPower: Function
  addEnergy: Function
  energy: number
}
type Dir = 'UP' | 'LEFT' | 'LFDN' | 'RGHT'
type CurDir = Dir | ''
type DirPower = Record<Dir, number>

const HWPanel: React.FC<Props> = ({ handleMainPower, addEnergy, energy }) => {
  const initDirPower: DirPower = {
    UP: 0,
    LEFT: 0,
    LFDN: 0,
    RGHT: 0,
  }

  const initCellPower = Array(21).fill(false)

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

  const radio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (mainPower) {
      // Add energy when cells turned off
      if (curDir && dirTracker[curDir]) {
        switch (curDir) {
          case 'UP': {
            return addEnergy(27)
          }
          case 'LEFT': {
            return addEnergy(22)
          }
          case 'LFDN': {
            return addEnergy(26)
          }
          default: {
            return addEnergy(24)
          }
        }
      }
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
    handleRadioPower(false)
    return handleMainPower(false)
  }

  // Handle clicks on directional buttons
  // Turns on cells to power off
  const handleDirPower = (dir: Dir) => {
    // Don't allow power to direction buttons if main power is off
    // Do not turn on again if all cells turned off
    if (!mainPower || dirTracker[dir]) return

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

    switch (dir) {
      case 'UP': {
        return setCellPower(genCellsOff())
      }
      case 'LEFT': {
        return setCellPower(genCellsChecker())
      }
      case 'LFDN': {
        return setCellPower(genCellsColumn())
      }
      default: {
        return setCellPower(genCellsOn())
      }
    }
  }

  const handleCellClick = (cell: number) => {
    const turnOffDirButton = () => {
      setCellPower(Array(21).fill(false))
      setDirTracker({
        ...dirTracker,
        [curDir]: true,
      })

      setDirPower({
        ...dirPower,
        [curDir]: 0,
      })
    }

    if (!mainPower) return

    // Don't allow button presses if direction is already finished
    if (curDir && dirTracker[curDir]) return

    let tempCellPower = [...cellPower]
    tempCellPower[cell] = !tempCellPower[cell]
    setCellPower(tempCellPower)

    switch (curDir) {
      case 'UP': {
        if (valCellsOff(tempCellPower)) return turnOffDirButton()
      }
      case 'LEFT': {
        if (valCellsChecker(tempCellPower)) return turnOffDirButton()
      }
      case 'LFDN': {
        if (valCellsColumn(tempCellPower)) return turnOffDirButton()
      }
      default: {
        if (valCellsOn(tempCellPower)) return turnOffDirButton()
      }
    }
  }

  const handleRadioPower = (turnOn: boolean) => {
    // On switch and more than 30 energy
    if (turnOn) {
      if (energy > 30) {
        setRadioPower(true)
        radio?.current?.play()
        addEnergy(-30)
      }

      // Off switch
    } else {
      // Return energy
      if (radioPower) {
        setRadioPower(false)
        radio?.current?.pause()
        addEnergy(30)
      }
    }
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
        className={cx(styles.cell, { [styles.on]: cellPower[cell] })}
        onClick={() => handleCellClick(cell)}
        key={cell}
      />
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
          <button
            className={cx(
              { [styles.on]: radioPower },
              { [styles.dim]: energy > 30 }
            )}
            onClick={() => handleRadioPower(true)}
          >
            1
          </button>
          <button onClick={() => handleRadioPower(false)}>0</button>
        </div>
        <div className={styles.screen}>Radio 30</div>
        <audio
          src='/relaxed_vlog-ashot-danielyan-composer.mp3'
          loop
          ref={radio}
        />
      </div>
    </div>
  )
}

export default HWPanel
