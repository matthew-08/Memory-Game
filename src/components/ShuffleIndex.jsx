const shuffleIndex = (arrayLength) => {
    const arrayOfIndex = []
    let randomIndex = getRandomIndex(arrayLength)

    while (arrayOfIndex.length !== arrayLength) {
        if (arrayOfIndex.includes(randomIndex)) {
            randomIndex = getRandomIndex(arrayLength)
        } else {
            arrayOfIndex.push(randomIndex)
            randomIndex = getRandomIndex(arrayLength)
        }
    }
    console.log(arrayOfIndex)
    return arrayOfIndex
}

const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength)
}

export default shuffleIndex