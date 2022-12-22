import React from 'react'
import styles from './main.module.css'
import CardsContainer from './CardsContainer'
import { useState } from 'react'
import { useEffect } from 'react'


export default function Main() {
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)


    const incrementScore = (n) => {
        setScore(score => score + 1)
    }

    const resetScore = () => {
        setScore(0)
    }

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score)
        }
    }, [score])

    return (
        <main>
            <div className={styles.header} >
                <p>Current Score: <span>{score}</span></p>
                <p>Best Score: <span>{bestScore}</span></p>
            </div>
            <CardsContainer incrementScore={incrementScore} resetScore={resetScore} />
        </main>
    )
}
