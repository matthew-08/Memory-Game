import React from 'react'
import styles from './cardscont.module.css'
export default function Card({ img, name, handleClick }) {
    return (
        <div className={styles.card} onClick={(e) => handleClick(name)}>
            <img src={`${img}`} alt="" />
            <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    )
}
