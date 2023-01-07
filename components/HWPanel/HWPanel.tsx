import { useState } from 'react'
import cx from 'classnames'
import styles from './HWPanel.module.scss'

type Props = {
  handleMainPower: Function
}
// 0 is off, 0.5 is dim, and 1 is on
type LOpts = 0 | 0.5 | 1
type ButtonLights = Record<string, LOpts>

const HWPanel: React.FC<Props> = ({ handleMainPower }) => {
  const initializeButtonLights: ButtonLights = {
    mainOn: 0.5,
    dirUp: 0,
    dirLeft: 0,
    dirLeftDown: 0,
    dirRight: 0,
    center1: 0,
    center2: 0,
    center3: 0,
    center4: 0,
    center5: 0,
    center6: 0,
    center7: 0,
    center8: 0,
    center9: 0,
    center10: 0,
    center11: 0,
    center12: 0,
    center13: 0,
    center14: 0,
    center15: 0,
    center16: 0,
    center17: 0,
    center18: 0,
    center19: 0,
    center20: 0,
    center21: 0,
    radioOn: 0,
    radioOff: 0,
  }

  const [buttonLights, setButtonLights] = useState(initializeButtonLights)

  // Main power for all hardware
  const handlePower = (turnOn: boolean) => {
    if (turnOn) {
      setButtonLights({
        ...buttonLights,
        mainOn: 1,
        dirUp: 0.5,
        dirLeft: 0.5,
        dirLeftDown: 0.5,
        dirRight: 0.5,
      })
      return handleMainPower(true)
    }

    setButtonLights(initializeButtonLights)
    return handleMainPower(false)
  }

  const handleDirPower = (
    dir: 'dirUp' | 'dirLeft' | 'dirLeftDown' | 'dirRight'
  ) => {
    // turn on button light and dim other directions
    setButtonLights({
      ...buttonLights,
      dirUp: 0.5,
      dirLeft: 0.5,
      dirLeftDown: 0.5,
      dirRight: 0.5,
      [dir]: 1,
    })

    // randomize center buttons on
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.power}>
        <button
          className={cx(
            { [styles.dim]: buttonLights.mainOn === 0.5 },
            { [styles.on]: buttonLights.mainOn === 1 }
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
            { [styles.dim]: buttonLights.dirUp === 0.5 },
            { [styles.on]: buttonLights.dirUp === 1 }
          )}
          onClick={() => handleDirPower('dirUp')}
        >
          UP
        </button>
        <button
          className={cx(
            { [styles.dim]: buttonLights.dirLeft === 0.5 },
            { [styles.on]: buttonLights.dirLeft === 1 }
          )}
          onClick={() => handleDirPower('dirLeft')}
        >
          LEFT
        </button>
        <button
          className={cx(
            { [styles.dim]: buttonLights.dirLeftDown === 0.5 },
            { [styles.on]: buttonLights.dirLeftDown === 1 }
          )}
          onClick={() => handleDirPower('dirLeftDown')}
        >
          LFDN
        </button>
        <button
          className={cx(
            { [styles.dim]: buttonLights.dirRight === 0.5 },
            { [styles.on]: buttonLights.dirRight === 1 }
          )}
          onClick={() => handleDirPower('dirRight')}
        >
          RGHT
        </button>
      </div>
      <div className={styles.center}>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
      </div>
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
