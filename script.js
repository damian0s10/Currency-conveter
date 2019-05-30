
const amountInput = document.getElementById('amountInput');
const currencyInput = document.getElementById('currencyInput');
const currencyOutput = document.getElementById('currencyOutput');
const result = document.getElementById('result');
const btn = document.getElementById('calculate');
let data = [];
let rate;
let from;
let to;

fetch("http://api.nbp.pl/api/exchangerates/tables/C/today/?format=json")
.then(resp => resp.json())
.then(resp => {
    console.log(resp);
    data = resp[0].rates;
    data.forEach( d => {
      rate = d.code;
      createHTML(rate);
    })
})
.catch(error => console.log("Błąd: ", error));

function createHTML(x) {
  const option1 = document.createElement('option');
  option1.innerText = x;
  currencyInput.appendChild(option1);
  const option2 = document.createElement('option');
  option2.innerText = x;
  currencyOutput.appendChild(option2);
}

function convertFromTo(x,y) {
  const amountIn = Math.round(amountInput.value * 100)/100;
  const currencyIn = currencyInput.value;
  const currencyOut = currencyOutput.value;
  let equal = 0;
  equal = amountIn * (x/y);
  if(currencyIn === currencyOut) {
  result.innerHTML ='You selected the same currency!!';
  } else {
  result.innerHTML = amountIn +' ' + currencyIn +' '+'='+' '+ Math.round(equal * 100)/100 +' '+ currencyOut;
  }
}

function convert(e)
{
  e.preventDefault();
  data.forEach( d => {
    if (d.code === currencyInput.value) from = d.bid;
    else if (d.code === currencyOutput.value) to = d.ask;
    })
    if (currencyInput.value === 'PLN') from = 1;
    else if (currencyOutput.value === 'PLN') to = 1;
  convertFromTo(from,to);
}
btn.addEventListener('click',convert);
