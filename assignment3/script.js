var currentItemIndex = 0
const kinveyBaseUrl = 'https://baas.kinvey.com/'
const kinveyAppKey = 'kid_SJRISdK_D'
var myItemObjectArray = 15
var yourItemAnswer = new Array()
var myItemAnswer = new Array(0, 0, 0, 2, 0, 1, 1, 2, 2, 1, 1, 0, 1, 0, 1)
var score = 10
var yourChecked = new Array(
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
  { choise: '' },
)
async function init(currentItemIndex) {
  var userAdmin = 'todor'
  var passAdmin = 'pass123'
  $('#score').hide()
  let url = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/questions'
  let header = new Headers()
  header.set('Authorization', 'Basic ' + btoa(userAdmin + ':' + passAdmin))
  const Question = await fetch(url, {
    method: 'GET',
    headers: header,
  }).then((response) => response.json())

  showQuestion(Question, currentItemIndex)
}

function showQuestion(ques, index) {
  var showQuestion = ques[index].question
  var showAnswer = `<ul class="listAnswer" style="list-style: none;"><li ><input id = 'ip0' type="radio" name="container" value ="${ques[index].option_a}">${ques[index].option_a}</input></li>
            <li><input id = 'ip1' type="radio" name="container" value ="${ques[index].option_b}">${ques[index].option_b}</input></li>
            <li><input id = 'ip2' type="radio" name="container" value ="${ques[index].option_c}">${ques[index].option_c}</input></li></ul>`
  var count = `${index + 1} out of 15`
  let n = yourChecked[index].choise
  $('#question').html(showQuestion)
  $('#answer').html(showAnswer)
  $('#order').html(count)
  $(`#ip${n}`).prop('checked', 'checked')
  if (currentItemIndex == 0) $('#previous').hide()
  else $('#previous').show()
  if (currentItemIndex == myItemObjectArray - 1) {
    $('#next').hide()
    $('#submit').show()
  } else {
    $('#submit').hide()
    $('#next').show()
  }
}
function nextQuestion() {
  currentItemIndex++
  if (currentItemIndex == myItemObjectArray) {
    currentItemIndex = myItemObjectArray
  }
  console.log(currentItemIndex)
  init(currentItemIndex)
  pushNextAnswer()
}
function previousQuestion() {
  currentItemIndex--
  if (currentItemIndex <= 0) {
    currentItemIndex = 0
  }
  console.log(currentItemIndex)
  init(currentItemIndex)
  pushPreviousAnswer()
}

function submitQuestion() {
  currentItemIndex++
  pushNextAnswer()
  checkAnswer(yourChecked)
}
function pushNextAnswer() {
  var x = document.myForm.container
  for (let i = 0; i < x.length; i++) {
    if (
      (x[i].checked && yourChecked[currentItemIndex - 1].choise == '') ||
      (x[i].checked && yourChecked[currentItemIndex - 1].choise != i)
    ) {
      // yourItemAnswer.push(x[i].value)
      yourChecked[currentItemIndex - 1].choise = i
    }
  }
  console.log(yourChecked)
  console.log(yourItemAnswer)
}
function pushPreviousAnswer() {
  var x = document.myForm.container
  for (let i = 0; i < x.length; i++) {
    if (
      (x[i].checked && yourChecked[currentItemIndex + 1].choise == '') ||
      (x[i].checked && yourChecked[currentItemIndex + 1].choise != i)
    ) {
      // yourItemAnswer.push(x[i].value)
      yourChecked[currentItemIndex + 1].choise = i
    }
  }
  console.log(yourChecked)
  console.log(yourItemAnswer)
}
function checkAnswer(array) {
  let i = 0
  while (i < myItemAnswer.length) {
    if (array[i].choise != myItemAnswer[i]) score = score - 0.6
    i++
  }
  if (score <= 0) score = 0
  var yourScore = Math.floor(score)
  $('#score').show()
  $('#score').html(`<p>Your Score is ${yourScore}</p>`)
}
