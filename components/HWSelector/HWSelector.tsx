import styles from './HWSelector.module.scss'

const HWSelector: React.FC = () => (
  <div className={styles.wrap}>
    <div className={styles.screen}>Selector</div>
    <div className={styles.bottom}>
      <button>1</button>
      <button>0</button>
      <button>UP</button>
      <button>DN</button>
      <button>ENT</button>
    </div>
  </div>
)

export default HWSelector
