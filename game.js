import GameState from './state.game.js'
import GameDesk from './desk.game.js'
import ancientsData from "./data/ancients.js"

const Game = (config) => {
    const { ancient, difficult } = config
    let stateModule = null
    let deckModule = null
    let ancientObject = {}

    function handleChange(card) {
        //изм ancientObject отняв счетчик
        //console.log('change', card, ancientObject)
        let key = `${card.color}Cards`

        if (ancientObject.firstStage[key] != 0) {
            ancientObject.firstStage[key] -= 1
        } else if (ancientObject.secondStage[key] != 0) {
            ancientObject.secondStage[key] -= 1
        } else if (ancientObject.thirdStage[key] != 0) {
            stateModule
            ancientObject.thirdStage[key] -= 1
        } else {
            console.warn('в колоде лишние карты')
        }
        //нов аншент обдж в game state & reinit()
        stateModule.init()
    }
    function resetGame() {
        stateModule.resetState()
        deckModule.resetDesk()
    }
    function init() {
        ancientsData.forEach(i => {
            if (i.id === ancient) ancientObject = JSON.parse(JSON.stringify(i));
        })

        stateModule = GameState({ ancientObject })
        stateModule.init()
        deckModule = GameDesk({ ancientObject, ancient, difficult, handleChange })
        deckModule.init()
    }
    return {
        init,
        resetGame,
    }
}



export default Game