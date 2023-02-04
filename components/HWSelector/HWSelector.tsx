import { useState, useEffect } from 'react'
import cx from 'classnames'
import { PowerStatus } from 'types'
import PressableButton from '../PressableButton'
import styles from './HWSelector.module.scss'

type Props = {
  energy: number
  addEnergy: Function
  mainPowerOn: boolean
  curText: number
  setCurText: Function
  handleEnter: Function
}

const HWSelector: React.FC<Props> = ({
  energy,
  addEnergy,
  mainPowerOn,
  curText,
  setCurText,
  handleEnter,
}) => {
  const [power, setPower] = useState(false)

  const selectionItems = [
    'welcome',
    'about',
    'technology',
    'contact',
    'resume',
    'music',
  ]

  useEffect(() => {
    if (!mainPowerOn) {
      setPower(false)
      setCurText(0)
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
          if (curText === 0) setCurText(selectionItems.length - 1)
          else setCurText(curText - 1)
        }
        break
      case 'DOWN':
        if (power) {
          if (curText === selectionItems.length - 1) setCurText(0)
          else setCurText(curText + 1)
        }
        break
      default:
        if (power) handleEnter()
    }
  }

  const selectionsEl = (
    <ul className={styles.selections}>
      {selectionItems.map((si, i) => (
        <li
          className={cx(styles.selection, {
            [styles.selection__selected]: curText === i,
          })}
          key={si}
        >
          {si}
        </li>
      ))}
    </ul>
  )

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
