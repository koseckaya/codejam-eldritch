import ancients from './assets/Ancients/index.js'
import difficulties from './data/difficulties.js'
import Game from './game.js'

const STATUS_INIT = 'init'
const STATUS_START = 'start'
const DEFAULT_CONFIG = {
    ancient: '',
    difficult: '',
    status: STATUS_INIT
};
const App = function () {
    let config = { ...DEFAULT_CONFIG };
    let gameModule = null

    const handleAncientClick = (e) => {
        if (config.status === STATUS_START) return
        let dataName = e.currentTarget.getAttribute('data-name')
        const ancientEl = document.querySelectorAll('.active.ancient')
        ancientEl.forEach(i => i.classList.remove('active'))
        e.currentTarget.classList.add('active')
        config.ancient = dataName

        validateAncients();
    }
    function renderAncient(name, link) {
        const card = document.createElement('div')
        card.classList.add('ancient')
        card.classList.add(name)
        if (config.ancient === name) {
            card.classList.add('active')
        }
        card.setAttribute('data-name', name)
        const ancImg = document.createElement('img')
        ancImg.setAttribute("alt", name);
        ancImg.src = `./assets/Ancients/${link}`
        card.appendChild(ancImg);
        return card
    }

    function renderAncients() {
        const ancientsEl = document.querySelector('.ancients')
        ancientsEl.innerHTML = ''
        for (let name in ancients) {
            ancientsEl.appendChild(renderAncient(name, ancients[name]))
        }
        const ancientEl = document.querySelectorAll('.ancient')
        ancientEl.forEach(i => i.addEventListener('click', handleAncientClick))
    }
    /*======================================= Ancient*/
    const handleChangeDifficult = (e) => {
        if (config.status === STATUS_START) return
        let dataDiff = e.currentTarget.getAttribute('data-diff')
        const difficultEl = document.querySelectorAll('.active.btn-diff')
        difficultEl.forEach(i => i.classList.remove('active'))
        e.currentTarget.classList.add('active')
        config.difficult = dataDiff

        validateDifficult();
    }

    const renderDifficultBtn = (compl) => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn-diff')
        if (config.difficult === compl.id) {
            button.classList.add('active')
        }
        button.setAttribute('data-diff', compl.id)
        const span = document.createElement('span')
        span.innerHTML = `${compl.name}`
        button.appendChild(span)
        return button
    }
    const renderDifficults = () => {
        const complexity = document.querySelector('.complexity')
        complexity.innerHTML = ''
        for (let key in difficulties) {
            complexity.appendChild(renderDifficultBtn(difficulties[key]))
        }
        const complexityEl = document.querySelectorAll('.btn')
        complexityEl.forEach(i => i.addEventListener('click', handleChangeDifficult))
    }
    const getAncientsEl = (isActive = false) => {
        return document.querySelectorAll(`.ancient${isActive ? '.active' : ''}`)
    }
    const getDiffBtns = () => {
        return document.querySelectorAll('.btn-diff')
    }
    /*======================================= Difficults*/
    const handlerStartGame = () => {
        if (!validateGame()) return
        getAncientsEl().forEach(i => {
            if (!i.classList.contains('active')) i.classList.add('hide')
        })
        getDiffBtns().forEach(i => {
            if (!i.classList.contains('active')) i.classList.add('hide')
        })
        document.querySelector('.container').classList.add('game-started')
        document.querySelector('.ancients-title').classList.add('hide')
        document.querySelector('.complexity-title').classList.add('hide')
        document.querySelector('.start').classList.add('hide');
        document.querySelector('.reset').classList.remove('hide');
        config.status = STATUS_START
        startGame()
    }
    const handlerResetGame = () => {
        config = { ...DEFAULT_CONFIG }
        document.querySelector('.container').classList.remove('game-started')
        document.querySelector('.ancients-title').classList.remove('hide')
        document.querySelector('.complexity-title').classList.remove('hide')
        document.querySelector('.start').classList.remove('hide');
        document.querySelector('.reset').classList.add('hide');
        gameModule.resetGame()
        init()
    }


    const renderControlsBtn = () => {
        const startBtn = document.querySelector('.start')
        const resetBtn = document.querySelector('.reset')
        startBtn.addEventListener('click', handlerStartGame)
        resetBtn.addEventListener('click', handlerResetGame)
    }
    const validateAncients = () => {
        const el = document.querySelector('.ancients-error');
        el.innerHTML = '';

        if (!config.ancient) {
            el.innerHTML = 'Choose your enemy!'
            return false
        }
        return true;
    }

    const validateDifficult = () => {
        const el = document.querySelector('.complexity-error');
        el.innerHTML = '';

        if (!config.difficult) {
            el.innerHTML = 'Choose difficult!'
            return false
        }
        return true;
    }

    const validateGame = () => {
        let isValid = true

        if (!validateAncients()) {
            isValid = false;
        }

        if (!validateDifficult()) {
            isValid = false;
        }

        return isValid
    }

    const init = () => {
        renderAncients();
        renderDifficults();
        renderControlsBtn()
    };

    const startGame = () => {
        gameModule = Game(config)
        gameModule.init()
    }

    return {
        init: init,
        startGame: () => { handlerStartGame() },

    }
}
const appplication = App()
appplication.init();
