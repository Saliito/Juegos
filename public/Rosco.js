const ORIGINAL_QUESTIONS = [
	{
		letter: 'a',
		answer: 'anzuelo',
		status: 0,
		question:
			'CON LA A. Se utiliza para atrapar peces'
	},

	{
		letter: 'b',
		answer: 'baquetas',
		status: 0,
		question:
			"CON LA B. Palillos que se utilizan para tocar la bateria"
	},

	{
		letter: 'c',
		answer: 'cinturon',
		status: 0,
		question: 'CON LA C. Accesorio que se usa para sujetar los pantalones'
	},

	{
		letter: 'd',
		answer: 'agrandar',
		status: 0,
		question:
			'CONTIENE LA D. Aumentar el tamaño o la magnitud de algo'
	},

	{
		letter: 'e',
		answer: 'español',
		status: 0,
		question:
			'CON LA E. Segunda lengua materna mas hablada en el mundo'
	},

	{
		letter: 'f',
		answer: 'facil',
		status: 0,
		question: 'CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad'
	},

	{
		letter: 'g',
		answer: 'galaxia',
		status: 0,
		question:
			'CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas'
	},

	{
		letter: 'h',
		answer: 'halagar',
		status: 0,
		question: 'CON LA H. Decirle cosas agradables a alguien, adular'
	},

	{
		letter: 'i',
		answer: 'iglesia',
		status: 0,
		question: 'CON LA I. Templo cristiano'
	},

	{
		letter: 'j',
		answer: 'jabali',
		status: 0,
		question:
			"CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"
	},

	{
		letter: 'k',
		answer: 'kamikaze',
		status: 0,
		question:
			'CON LA K. Persona que se juega la vida realizando una acción temeraria'
	},

	{
		letter: 'l',
		answer: 'licantropo',
		status: 0,
		question: 'CON LA L. En la mitológica es el poder que tiene un ser humano para transformarse en lobo.'
	},

	{
		letter: 'm',
		answer: 'musico',
		status: 0,
		question:
			'CON LA M. Aquella persona que toca un instrumento profecionalmente'
	},

	{
		letter: 'n',
		answer: 'naipes',
		status: 0,
		question: 'CON LA N. Para jugar al poker son necesarios'
	},

	{
		letter: 'o',
		answer: 'minions',
		status: 0,
		question:
			'CONTIENE LA O. Criaturas amarillas que usan lentes y jardineros'
	},

	{
		letter: 'p',
		answer: 'pasaporte',
		status: 0,
		question:
			'CON LA P. Documento que te permite viajar de un pais a otro'
	},

	{
		letter: 'q',
		answer: 'queso',
		status: 0,
		question:
			'CON LA Q. Producto obtenido por la maduración de la cuajada de la leche'
	},

	{ 
		letter: 'r', 
		answer: 'raton', 
		status: 0, question: 'CON LA R. Roedor' 
	},

	{
		letter: 's',
		answer: 'snoopy',
		status: 0,
		question: 'CON LA S. Perrito blanco que duerme en el techo de su casita'
	},

	{
		letter: 't',
		answer: 'telaraña',
		status: 0,
		question:
			'CON LA T. Tela que forman los aracnidos'
	},

	{
		letter: 'u',
		answer: 'universo',
		status: 0,
		question:
			"CON LA U. Las galaxias, las estrellas, todo esta en el"
	},

	{
		letter: 'v',
		answer: 'volante',
		status: 0,
		question:
			'CON LA V. Parte del automovil que permite maniobrarlo'
	},

	{
		letter: 'w',
		answer: 'sandwich',
		status: 0,
		question:
			'CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso'
	},

	{
		letter: 'x',
		answer: 'xilofono',
		status: 0,
		question: 'CON LA X. Instrumento de percusion, conjunto de barras'
	},

	{
		letter: 'y',
		answer: 'yugular',
		status: 0,
		question:
			'CON LA Y. Relacionado a las venas situadas en el cuello'
	},

	{
		letter: 'z',
		answer: 'ajedrez',
		status: 0,
		question:
			'CONTIENE LA Z. Juego que combina tactica, estratejia y logica'
	}
]
const LETTERS = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z'
]
const AVAILABLE_TIME = 180

const WELCOME_PAGE = document.querySelector('.welcome')
const SCORE_PAGE = document.querySelector('.scorePopup')
const SCOREPOP_CORRECT_ANSWERS = document.querySelector(
	'.scorePop-correctAnswers'
)
const SCOREPOP_TIME_LEFT = document.querySelector('.scorePop-timeLeft')
const SCORE_CORRECT_ANSWERS = document.querySelector('.score-correct')
const SCORE_TIME_LEFT = document.querySelector('.score-time')
const PLAYER_NAME_INPUT = document.querySelector('#inputPlayerName')
const START_GAME_BUTTON = document.querySelector('#inputStartGame')
const ANSWER_BUTTON = document.querySelector('#btn-asnwer')
const DISPLAY = document.querySelector('#questions')
const LAST_PLAYERS_LIST = document.querySelector('.lastPlayersList')
const USER_ANSWER_INPUT = document.querySelector('.btn-text')

USER_ANSWER_INPUT.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		checkAnswer()
	}
})

const LAST_PLAYERS = []

let questions = null
let playerName = null
let correctAnswers = 0
let incorrectAnswers = 0
let turn = 1
let actualQuestion = 0
let actualLetter = null
let timeLeft = AVAILABLE_TIME
let timer = null

const initialLoad = () => {
	showLastPlayers()
}

const startGame = () => {
	questions = [...ORIGINAL_QUESTIONS]
	hide(WELCOME_PAGE)
	setTimer('start')
	showNextQuestion()
}

const showNextQuestion = () => {
	if (actualQuestion > questions.length - 1) {
		actualQuestion = 0
	}
	if (questions[actualQuestion].status != 1) {
		showQuestion(questions[actualQuestion])
	} else {
		actualQuestion++
		let remainingWords = questions.filter((question) => question.status === 0)
		if (remainingWords.length === 0) {
			showScore()
		}
		showNextQuestion()
	}
}

const pasapalabra = () => {
	let letter = document.querySelector('.' + actualLetter)
	letter.classList.add('pasa')
	turn++
	actualQuestion++
	cleanInputText()
	showNextQuestion()
}

const checkAnswer = () => {
	let answer = USER_ANSWER_INPUT.value.toLowerCase()
	let letter = document.querySelector('.' + actualLetter)
	if (answer === '') {
		USER_ANSWER_INPUT.classList.add('wrong')
		return
	}
	letter.classList.remove('pasa')
	if (answer === questions[actualQuestion].answer) {
		letter.classList.add('correct')
		correctAnswers++
		updateScore()
	} else {
		letter.classList.add('wrong')
		incorrectAnswers++
	}
	questions[actualQuestion].status = 1
	turn++
	actualQuestion++
	cleanLastLetter()
	cleanInputText()
	showNextQuestion()
}

const saveGameStats = () => {
	if (LAST_PLAYERS.length === 5) {
		LAST_PLAYERS.shift()
	}
	LAST_PLAYERS.push({
		name: playerName,
		correctAnswers: correctAnswers,
		timeLeft: timeLeft
	})
}

const resetGame = () => {
	playerName = null
	correctAnswers = 0
	incorrectAnswers = 0
	turn = 1
	actualQuestion = 0
	actualLetter = null
	timeLeft = AVAILABLE_TIME
	cleanAllQuestionStatus()
	resetInputPlayerName()
	cleanAllLetters()
	initialLoad()
}

const endGame = () => {
	saveGameStats()
	resetGame()
	hide(SCORE_PAGE)
	show(WELCOME_PAGE)
}

const showLastPlayers = () => {
	LAST_PLAYERS_LIST.innerHTML = ''
	if (LAST_PLAYERS.length < 1) {
		LAST_PLAYERS_LIST.innerHTML = '<li> - </li>'
	}
	LAST_PLAYERS.forEach((element) => {
		LAST_PLAYERS_LIST.innerHTML +=
			'<li>' +
			element.name +
			': Correctas: ' +
			element.correctAnswers +
			' - Tiempo restante: ' +
			element.timeLeft +
			'</li>'
	})
}

const showScore = () => {
	setTimer('stop')
	SCOREPOP_CORRECT_ANSWERS.innerHTML = correctAnswers
	SCOREPOP_TIME_LEFT.innerHTML = timeLeft
	show(SCORE_PAGE)
}

const showQuestion = (el) => {
	actualLetter && cleanLastLetter()
	actualLetter = el.letter
	let letter = document.querySelector('.' + actualLetter)
	letter.classList.add('active')
	DISPLAY.innerHTML = el.question
}

const capitalizeFirstLetter = (word) => {
	word = word.toLowerCase()
	return word.charAt(0).toUpperCase() + word.slice(1)
}

const setTimer = (action) => {
	const startTimer = () => {
		timer = setInterval(() => {
			if (timeLeft === 0) {
				showScore()
				stopTimer()
				return
			}
			timeLeft--
			updateScore()
		}, 1000)
	}

	const stopTimer = () => {
		clearInterval(timer)
	}

	action === 'start' && startTimer()
	action === 'stop' && stopTimer()
}

const show = (element) => {
	element.classList.remove('hidden')
}

const hide = (element) => {
	element.classList.add('hidden')
}

const handleNameChange = () => {
	if (PLAYER_NAME_INPUT.value.length > 0) {
		show(START_GAME_BUTTON)
	} else {
		show(START_GAME_BUTTON)
	}
}

const updateScore = () => {
	SCORE_CORRECT_ANSWERS.innerHTML = correctAnswers
	SCORE_TIME_LEFT.innerHTML = timeLeft
}

const resetInputPlayerName = () => {
	PLAYER_NAME_INPUT.value = ''
	hide(START_GAME_BUTTON)
}

const cleanLastLetter = () => {
	let letter = document.querySelector('.' + actualLetter)
	letter.classList.remove('active')
}

const cleanAllLetters = () => {
	LETTERS.forEach((letter) => {
		let letterToClean = document.querySelector('.' + letter)
		letterToClean.classList.remove('active', 'wrong', 'correct', 'pasa')
	})
}

const cleanAllQuestionStatus = () => {
	questions.map((question) => (question.status = 0))
}

const cleanInputText = () => {
	USER_ANSWER_INPUT.value = ''
	USER_ANSWER_INPUT.classList.remove('wrong')
}

initialLoad()