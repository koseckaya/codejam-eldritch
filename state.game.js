

const GameState = (config) => {
    const { ancientObject } = config

    function renderState() {
        const stateEl = document.querySelector('.state')
        stateEl.innerHTML = ''
        stateEl.appendChild(renderStateRow('first', ancientObject.firstStage))
        stateEl.appendChild(renderStateRow('second', ancientObject.secondStage))
        stateEl.appendChild(renderStateRow('third', ancientObject.thirdStage))
    }
    function renderStateRow(stage, row) {
        const rowBlock = document.createElement('div')
        rowBlock.classList.add(`state-${stage}`)
        const greenEl = document.createElement('div')
        greenEl.classList.add('state-item', `state-${stage}--green`)
        greenEl.innerHTML = row.greenCards
        rowBlock.appendChild(greenEl)
        const brownEl = document.createElement('div')
        brownEl.classList.add('state-item', `state-${stage}--brown`)
        brownEl.innerHTML = row.brownCards
        rowBlock.appendChild(brownEl)
        const blueEl = document.createElement('div')
        blueEl.classList.add('state-item', `state-${stage}--blue`)
        blueEl.innerHTML = row.blueCards
        rowBlock.appendChild(blueEl)
        return rowBlock
    }
    function resetState() {
        const stateEl = document.querySelector('.state')
        stateEl.innerHTML = ''
    }

    function init() {
       
        renderState()
    }

    return {
        init,
        resetState,
    }
}



export default GameState