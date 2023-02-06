import cx from 'classnames'
import Hardware from '@/components/Hardware'
import Nav from '@/components/Nav'
import styles from '@/styles/index.module.scss'
import PressableButton from '@/components/PressableButton'
import { useState } from 'react'
import { PowerStatus } from 'types'

export default function Home() {
  const [buttonIndex, setButtonIndex] = useState([0, 1, 2, 3])

  const buttonColors: PowerStatus[] = ['off', 'on', 'orange', 'blue']

  // Click through colors to demo buttons
  const handleClick = (index: number) => {
    let tempIndex = [...buttonIndex]
    if (buttonIndex[index] >= buttonColors.length - 1) {
      tempIndex[index] = 0
      setButtonIndex(tempIndex)
    } else {
      tempIndex[index] = tempIndex[index] + 1
      setButtonIndex(tempIndex)
    }
  }

  // Create button elements
  const buttonsEl = [0, 1, 2, 3].map((n) => (
    <PressableButton
      handleClick={() => handleClick(n)}
      power={buttonColors[buttonIndex[n]]}
      text={n.toString()}
      key={n}
    />
  ))

  return (
    <div className={cx(styles.wrap, 'container')}>
      <Hardware />

      {/* For anything below 1000px */}
      <Nav />
      <div className={styles.disclaimer}>
        This website is best viewed on computer screens. Well... unless you like
        black screens with 3 links. If you do this might be for you. Who am to
        judge? You do you. But seriously, look at this from a computer. It's got
        super sweet buttons like this:
        <div className={styles.buttonsWrap}>{buttonsEl}</div>
      </div>
    </div>
  )
}
