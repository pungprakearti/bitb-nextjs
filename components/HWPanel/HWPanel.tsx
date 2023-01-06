import styles from './HWPanel.module.scss'

const HWPanel: React.FC = () => (
  <div className={styles.wrap}>
    <div className={styles.power}>
      <button>1</button>
      <button>0</button>
    </div>
    <div className={styles.direction}>
      <button>UP</button>
      <button>LEFT</button>
      <button>LFDN</button>
      <button>RGHT</button>
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

export default HWPanel
