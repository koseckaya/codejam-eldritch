import {
    brownCards,
    blueCards,
    greenCards
}  from './data/mythicCards/index.js' 
import { getRequirementsForDeck, getShuffledDeckBySize } from './helpers/deck.js'
import { getSliceCards, shuffleCards } from  './helpers/randomizer.js'



const GameDesk = (config) => {
    let finalGameDeck = []
    const { ancientObject, difficult, handleChange } = config


    function init() {
        finalGameDeck = generateDesk()
        bind()
    }
     function generateDesk() {
        let requirements = getRequirementsForDeck(ancientObject)
   
        let greenAvailableDeck = getShuffledDeckBySize(greenCards, requirements.greenCards, difficult)
        let brownAvailableDeck = getShuffledDeckBySize(brownCards, requirements.brownCards, difficult)
        let blueAvailableDeck = getShuffledDeckBySize(blueCards, requirements.blueCards, difficult)
 
        let firstGreenSlice = getSliceCards(greenAvailableDeck, ancientObject.firstStage.greenCards)
        let firstBrownSlice = getSliceCards(brownAvailableDeck, ancientObject.firstStage.brownCards)
        let firstBlueSlice = getSliceCards(blueAvailableDeck, ancientObject.firstStage.blueCards)
     
        let firstStageDeck = [
            ...firstGreenSlice.result,
            ...firstBrownSlice.result,
            ...firstBlueSlice.result
        ];
        let secondGreenSlice = getSliceCards(firstGreenSlice.rest, ancientObject.secondStage.greenCards)
        let secondBrownSlice = getSliceCards(firstBrownSlice.rest, ancientObject.secondStage.brownCards)
        let secondBlueSlice = getSliceCards(firstBlueSlice.rest, ancientObject.secondStage.blueCards)
        let secondStageDeck = [
            ...secondGreenSlice.result,
            ...secondBrownSlice.result,
            ...secondBlueSlice.result
        ]
        let thirdStageDeck = [
            ...secondGreenSlice.rest,
            ...secondBrownSlice.rest,
            ...secondBlueSlice.rest
        ]
     
        let finalDeck = []
        finalDeck.push(...shuffleCards(firstStageDeck))
        finalDeck.push(...shuffleCards(secondStageDeck))
        finalDeck.push(...shuffleCards(thirdStageDeck))
    
        
        return finalDeck
    }
    function handleCardPackClick() {
        if (finalGameDeck.length === 1) {
            const cardPackEl = document.querySelector('.card-pack')
            cardPackEl.removeEventListener('click', handleCardPackClick)
            document.querySelector('.card-pack--img').classList.remove('card-pack-bg')
        }
        let activeCard = finalGameDeck.shift()
        let cardUrl = `url(assets/MythicCards/${activeCard.color}/${activeCard.cardFace})`
        document.querySelector('.current-card--img').style.backgroundImage = cardUrl
        handleChange(activeCard)
        
    }
    function resetDesk() {
          document.querySelector('.card-pack--img').classList.add('card-pack-bg')
        document.querySelector('.current-card--img').style.backgroundImage = 'none'
    }

    function bind() {
        const cardPackEl = document.querySelector('.card-pack')
        cardPackEl.addEventListener('click', handleCardPackClick)
    }
    

    return {
        init,
        resetDesk,
    }
}







export default GameDesk