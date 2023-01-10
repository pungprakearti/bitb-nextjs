import styles from './HWScreen.module.scss'

const HWScreen: React.FC = () => (
  <div className={styles.wrap}>
    <div>Screen</div>
    <div className={styles.right}>
      <button>1</button>
      <button>0</button>
      <button>CHUP</button>
      <button>CHDN</button>
      <button>BUP</button>
      <button>BDN</button>
    </div>
  </div>
)

export default HWScreen
