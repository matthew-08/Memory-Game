import React from 'react'
import styles from './cardscont.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import randomIndex from './GetRandomIndex'
import Card from './Card'
import { v4 as uuidv4 } from 'uuid';
import shuffleIndex from './ShuffleIndex'
import { Grid } from 'react-loader-spinner'


let roundCount = 4

export default function CardsContainer({ resetScore, incrementScore }) {
    const [pokemon, setPokemon] = useState([])
    const [randomPoke, setRandomPoke] = useState([])
    const [roundStart, setRoundStart] = useState(false)
    const [clicked, setClicked] = useState([])

    const handleRandomPoke = () => {
        const arrayOfIndex = []
        for (let i = 0; i < roundCount; i++) {
            arrayOfIndex.push(randomIndex(pokemon.length))
        }
        const pokeToGet = pokemon.filter((poke, index) => {
            for (let i = 0; i <= arrayOfIndex.length; i++) {
                if (index == arrayOfIndex[i]) {
                    return true
                }
            }
        })
        setRandomPoke(pokeToGet);
        setPokemon(pokemon.filter((poke, index) => {
            return !arrayOfIndex.includes(index)
        }))
        /* setRandomPoke(randomPoke.map((poke) => {
            return { ...poke, id: uuidv4() }
        })) */
    }

    useEffect(() => {
        const promises = []
        for (let i = 1; i <= 200; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`
            promises.push(fetch(url).then((res) => res.json()))

        }
        Promise.all(promises).then((res) => {
            return res.map((res) => {
                return {
                    name: res.name,
                    image: res.sprites['front_default'],
                }
            })
        }).then(res => setPokemon(res))
    }, [])

    useEffect(() => {
        if (pokemon.length > 1 && roundStart === false) {
            setRoundStart(true)
            return handleRandomPoke();
        }
        console.log(pokemon)
    }, [pokemon])

    const handleNextRound = () => {
        setRandomPoke([])
        roundCount += 4;
        handleRandomPoke()
    }

    const shuffle = () => {
        const randomIndex = shuffleIndex(randomPoke.length)
        setRandomPoke(randomPoke.map(poke => randomPoke[randomIndex.shift()]))
    }

    const handleClick = (name) => {
        if (clicked.length === roundCount) {
            return handleNextRound()
        }
        if (clicked.includes(name)) {
            setClicked([])
            roundCount = 4
            setRandomPoke([])
            handleRandomPoke()
            return resetScore()
        } else {
            setClicked([...clicked, name])
            shuffle()
            incrementScore()
        }
    }

    return (
        <section className={styles.cont}>
            {randomPoke.length > 1 ? (
                randomPoke.map((poke) => <Card img={poke.image} name={poke.name} handleClick={handleClick} />)
            ) :
                <>
                    <Grid height={'80'} width={'80'} color={"white"} />
                    <h1 style={{ color: "white" }}>...Loading</h1>
                </>
            }
        </section>
    )
}
