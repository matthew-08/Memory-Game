import React from 'react'
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <img src="/img/char.png" alt="" />
            <h1>Poke-Memorize</h1>
        </nav>
    )
}
