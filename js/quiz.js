const questions = [
	{
		question: "Какой из этих кофейных напитков самый крепкий?",
		answers: ["Классический эспрессо", "Ристретто", "Лунго", "Латте"],
		correct: 3,
	},
	{
		question: "Для чего к эспрессо подают стакан воды?",
		answers: [
			"Чтобы запить эту горечь скорее",
			"Вода нужна для того, чтобы очистить вкусовые рецепторы и почувствовать максимум от своего кофе",
			"Для того чтобы разбавить крепкий эспрессо водой",
			"Чтобы не допустить осушения организма",
		],
		correct: 4,
	},
	{
		question: "Что из этого напиток из кофе и молока с добавлением какао или шоколада?",
		answers: [
			"Глясе",
			"Руссиано",
			"Фраппучино",
			"Моккачино",
		],
		correct: 4,
	},
	{
		question: "Кофе по-ирландски - это кофе с добавлением...?",
		answers: ["Виски", "Коньяка", "Пива", "Водки"],
		correct: 1,
	},
];

// находим элементы
const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// переменные игры
let score = 0
let questionIndex = 0

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer

function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {

	const headerTeplate = `<h2 class="title">%title%</h2>`
	const title = headerTeplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title

	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', index + 1)
		console.log(answerHTML)
		listContainer.innerHTML += answerHTML
	}
}

function checkAnswer() {
	// находим выбранную кнопку
	const checkedRadio = listContainer.querySelector('input:checked')
	if (!checkedRadio) {
		submitBtn.blur()
		return
	}

	const userAnswer = parseInt(checkedRadio.value)

	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}
	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		clearPage()
		showResults()

	}
}

function showResults() {
	console.log('start')
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`
	let title, message
	if (score === questions.length) {
		title = 'Поздравляем!'
		message = 'Вы ответили на все вопросы и являетесь кофеманом'
	}
	else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!'
		message = 'Вы дали более половины ответов, но есть к чему стремиться, пейте побольше кофе'
	} else {
		title = 'Стоит постараться!'
		message = 'Чаефилам здесь не место!'
	}
	let result = `${score} из ${questions.length}`

	let finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)

	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerHTML = 'Начать заново'
	submitBtn.onclick = function () {
		history.go()
	}
}
