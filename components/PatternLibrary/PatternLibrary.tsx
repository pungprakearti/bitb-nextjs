import cx from 'classnames'
import styles from './PatternLibrary.module.scss'

const PatternLibrary = () => {
  const colors = [
    'orange',
    'cyan',
    'pink',
    'blue',
    'white',
    'black'
  ]

  return (
    <div className={styles.wrap}>
      <div>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <h1 className={styles.typography}>
          h1 - Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.
        </h1>
        <h2 className={styles.typography}>
          h2 - Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.
        </h2>
        <p className={styles.typography}>
          body - I'm not superstitious, but I am a little stitious.
        </p>
      </div>
      <div>
        <h2 className={styles.sectionTitle}>Colors</h2>
        <div className={styles.colors}>
          {colors.map((color) => {
            return (
              <div className={styles.colorsPalette} key={color}>
                <h2 className={styles.colorsPaletteTitle}>
                  {color}
                </h2>
                <div className={cx(styles.colorsPaletteColor, styles[`colorsPaletteColor__${color}`])} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PatternLibrary
