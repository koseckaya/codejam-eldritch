import {
    DIFF_CASUAL,
    DIFF_EASY,
    DIFF_NORMAL,
    DIFF_HARD,
    DIFF_DEADLY
} from '../data/difficulties.js'
import { getCardsByDifficult, getCardsBySize, mergeCards, shuffleCards } from './randomizer.js'

export function getRequirementsForDeck(ancient) {
    let stages = [ancient.firstStage, ancient.secondStage, ancient.thirdStage]
    return stages.reduce((acc, i) => {
        acc.greenCards +=  i.greenCards
        acc.blueCards += i.blueCards
        acc.brownCards += i.brownCards
        return acc
     }, {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0
    })
}


export function getShuffledDeckBySize(cards, size, difficult) {
    let result = []

    switch (difficult) {
        case DIFF_CASUAL:
            let easyCards = getCardsByDifficult(cards, ['easy'])
            let normalCards= [];
            if (easyCards.length < size) {
                normalCards = getCardsByDifficult(cards, ['normal'])
                let normalSize = size - easyCards.length
                let normCardsLen = getCardsBySize(normalCards, normalSize)
                result = mergeCards(easyCards, normCardsLen, [])
            } else {
                result = getCardsBySize(easyCards, size)
            }
            break;
        case DIFF_EASY:
            let diffeasyCards = getCardsByDifficult(cards, ['easy', 'normal'])
            result = getCardsBySize(diffeasyCards, size)
            break;
        case DIFF_NORMAL:
            result = getCardsBySize(cards, size)
            break;
        case DIFF_HARD:
            let diffHardCards = getCardsByDifficult(cards, ['hard', 'normal'])
            result = getCardsBySize(diffHardCards, size)
            break;
        
        case DIFF_DEADLY:
            let deadlyCards =  getCardsByDifficult(cards, ['hard'])
              let normalCardsDiff = [];
            if (deadlyCards.length < size) {
                normalCardsDiff = getCardsByDifficult(cards, ['normal'])
                let normalSize = size - deadlyCards.length
                let normalCardsLen = getCardsBySize(normalCardsDiff, normalSize)
                result = mergeCards(deadlyCards, normalCardsLen,  [])
            } else {
                result = getCardsBySize(deadlyCards, size)
            }
            break;
    }
    
    return shuffleCards(result)
}

