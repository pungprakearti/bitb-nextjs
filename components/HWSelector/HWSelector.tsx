import { useState, useEffect } from 'react'
import cx from 'classnames'
import { PowerStatus } from 'types'
import PressableButton from '../PressableButton'
import styles from './HWSelector.module.scss'

type Props = {
  energy: number
  addEnergy: Function
  mainPowerOn: boolean
}

const HWSelector: React.FC<Props> = ({ energy, addEnergy, mainPowerOn }) => {
  const [power, setPower] = useState(false)
  const [curItem, setCurItem] = useState(0)

  const selectionItems = ['welcome', 'about', 'technology']

  useEffect(() => {
    if (!mainPowerOn) {
      setPower(false)
    }
  }, [mainPowerOn])

  // I ❤️ switches
  const handleClick = (op: 'on' | 'off' | 'UP' | 'DOWN' | 'ENTR') => {
    switch (op) {
      case 'on':
        if (!power && energy > 15) {
          addEnergy(-15)
          setPower(true)
        }
        break
      case 'off':
        if (power) {
          addEnergy(15)
          setPower(false)
        }
        break
      case 'UP':
        if (power) {
          if (curItem === 0) setCurItem(selectionItems.length - 1)
          else setCurItem(curItem - 1)
        }
        break
      case 'DOWN':
        if (power) {
          if (curItem === selectionItems.length - 1) setCurItem(0)
          else setCurItem(curItem + 1)
        }
        break
      default:
        break
    }
  }

  const selectionsEl = (
    <ul className={styles.selections}>
      {selectionItems.map((si, i) => (
        <li
          className={cx(styles.selection, {
            [styles.selection__selected]: curItem === i,
          })}
          key={si}
        >
          {si}
        </li>
      ))}
    </ul>
  )
  /**
   *  You are # to get this old piece of junk up and running! What else can you discover?
   *
   * This device was built in NextJS using TypeScript and SASS by Andrew Pungprakearti
   * When Andrew isn't building weird little apps, he is volunteering his time with
   * Mentor Me of Petaluma, and coaches youth ice hockey for the Santa Rosa Flyers.
   * He is also a veteran of the United States Marine Corps and served during Operation Enduring Freedom
   *
   * Technology:
   * NextJS
   * Gatsby
   * React
   * TypeScript
   * JavaScript
   * GraphQL
   * SASS
   * LESS
   * CSS
   * Node
   * Express
   * Python
   *
   *
   *
   *
   */

  let powerStatus: PowerStatus = 'off'
  if (energy > 15) powerStatus = 'dim'
  if (power) powerStatus = 'on'

  return (
    <div
      className={cx(styles.wrap, { [styles.powerOn]: powerStatus === 'on' })}
    >
      <div className={styles.screenWrap}>
        <div className={styles.screenInner}>
          <div className={styles.screen}>{selectionsEl}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <div className={styles.buttonsTop}>
            <div className={styles.buttonsTopLeft}>
              <PressableButton
                handleClick={() => handleClick('on')}
                text='1'
                power={powerStatus}
                type='sel'
              />
              <PressableButton
                handleClick={() => handleClick('off')}
                text='0'
                type='sel'
              />
            </div>
            <div className={styles.buttonsTopRight}>
              <PressableButton
                handleClick={() => handleClick('UP')}
                text='⬆'
                type='sel'
              />
              <PressableButton
                handleClick={() => handleClick('DOWN')}
                text='⬇'
                type='sel'
              />
            </div>
          </div>
          <div className={styles.buttonsBottom}>
            <PressableButton
              handleClick={() => handleClick('ENTR')}
              text='ENTER'
              type='sel-enter'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default HWSelector
