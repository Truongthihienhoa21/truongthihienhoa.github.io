const kinveyBaseUrl = 'https://baas.kinvey.com/'
const kinveyAppKey = 'kid_SJRISdK_D'
async function init() {
  let user = 'todor'
  let pass = 'pass123'
  let url = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/quote'
  let header = new Headers()
  header.set('Authorization', 'Basic ' + btoa(user + ':' + pass))
  const quotes = await fetch(url, {
    method: 'GET',
    headers: header,
  }).then((response) => response.json())
  loadQuoteSuccess(quotes)
}
function loadQuoteSuccess(quote) {
  var count = 0
  for (let p in quote) {
    count++
    var showQuote = `<p>${'Quote ' + count + ':'}</p>
     <p class="col-md-11" id="quote" style="font-size: 20px">${
       quote[p].actualQuote
     }</p>
    <p class="col-md-8" id="author" style="font-size: 15px">${
      quote[p].author
    }</p>`
    $('#listQuote').append(showQuote)
  }
}
function newQuote() {
  window.location = 'formQuote.html'
}
async function addNewQuote() {
  let user = 'todor'
  let pass = 'pass123'
  let quoteData = {
    actualQuote: $('#newAcQuote').val(),
    author: $('#newAuthor').val(),
  }
  const header = {
    Authorization: 'Basic ' + btoa(user + ':' + pass),
    'Content-Type': 'application/json',
  }
  let url = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/quote'
  await fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(quoteData),
  }).then((res) => res.json())
  window.location.href = './index.html'
}
