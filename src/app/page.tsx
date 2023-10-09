import styles from './page.module.scss'
import {Board} from "@/app/(components)/Board";

export default function Home() {
  return (
    <main className={styles.main}>
      <Board />
    </main>
  )
}
