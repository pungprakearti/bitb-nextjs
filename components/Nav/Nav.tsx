import cx from 'classnames'
import Link from 'next/link'
import styles from './Nav.module.scss'

const Nav: React.FC = () => (
  <nav className={cx(styles.wrap, 'container')}>
    <div className={styles.left}>Andrew Pungprakearti</div>
    <div className={styles.right}>
      <Link
        className={styles.link}
        href='https://www.linkedin.com/in/andrewpungprakearti'
        target='_blank'
        rel='noreferrer'
      >
        LinkedIn
      </Link>
      <Link
        className={styles.link}
        href='https://github.com/pungprakearti'
        target='_blank'
        rel='noreferrer'
      >
        Github
      </Link>
      <Link
        className={styles.link}
        href='/AndrewPungprakearti_Resume2022.pdf'
        target='_blank'
        rel='noreferrer'
      >
        Resume
      </Link>
    </div>
  </nav>
)

export default Nav
