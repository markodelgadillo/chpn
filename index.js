// watch the Wes Bos video when he stores data in the browser cookies
const contributors = JSON.parse(localStorage.getItem('contributors')) || []
var cost

let totalAmount = document.querySelector('#total')
let tips = document.querySelectorAll('.tip')
let person = document.querySelector('#person')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')

function total(totalAmount) {
  this.value.toString().split('.')[1].length === 1
    ? this.setAttribute('onkeydown', 'return false')
    : this.removeAttribute('onkeydown')

  cost = parseFloat(this.value)
}

function plusTip() {
  totalAmount.value.toString().split('.')[1].length === 1
    ? alert('You forgot about the cents!')
    : (cost = cost + cost * (this.value * 0.01))
  alert(
    'With tip, the total comes out to ' + parseFloat(cost.toString()).toFixed(2)
  )
}

function keyCheck(e) {
  if (e.keyCode === 8 && totalAmount.getAttribute('onkeydown')) {
    totalAmount.removeAttribute('onkeydown')
  }
}

function addContributor() {
  person.value === ''
    ? alert('You need to add a name!')
    : contributors.push(person.value)
  person.value = ''
  localStorage.setItem('contributors', JSON.stringify(contributors))
  console.log(contributors)
}

totalAmount.addEventListener('keypress', total)
totalAmount.addEventListener('keydown', keyCheck)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
