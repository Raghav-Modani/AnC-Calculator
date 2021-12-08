import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'

const Home: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image src='/anc-logo.png' width={100} height={100} />
        <Link href='/calculator'><Button type='default' className={styles.button}> <a target='_blank'>Calculate CPI/SPI</a> </Button></Link>
        <Link href='/status'><Button type='default' className={styles.button}> <a target='_blank'>Check AP/Warning Status</a> </Button></Link>
      </div>
    </div>
  )
}

export default Home
