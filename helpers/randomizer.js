
// общ набор карт, дификалт -> отсортир карты
export function getCardsByDifficult(cards, difficults) {
    return cards.filter(i =>  difficults.includes(i.difficulty))
}
//cards , size -> []
export function getCardsBySize(cards, size) {
    return shuffleCards(cards).slice(0, size);
}
//
export function getSliceCards(cards,size) {
    let shuffledDesk = shuffleCards(cards);
    let shuffledSlice = shuffledDesk.slice(0, size)
    let rest = shuffledDesk.slice(size)

    return {
        result: shuffledSlice,
        rest: rest,
    }
}

export function mergeCards(arr1, arr2, arr3) {
    return shuffleCards([].concat(arr1,arr2,arr3))

}

export function shuffleCards(arr) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled
}

// const res = getSliseCard
// res[result]
// res[rest], 3
