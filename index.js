// watch the Wes Bos video when he stores data in the browser cookies
// const contributors = JSON.parse(localStorage.getItem('contributors')) || []
const contributors = []
var cost

let totalAmount = document.querySelector('#total')
let tips = document.querySelectorAll('.tip')
let person = document.querySelector('#person')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')

function total() {
  !this.value.includes('.')
    ? (cost = parseFloat(this.value))
    : this.value.split('.')[1].length === 2
      ? this.setAttribute('onkeydown', 'return false')
      : this.removeAttribute('onkeydown')
  cost = parseFloat(this.value)
  console.log(typeof cost, cost)
}

function onSelect() {
  this.removeAttribute('onkeydown', 'return false')
  window.setTimeout(total, 250)
}

function plusTip() {
  let withTip
  console.log(
    typeof parseFloat(cost.toString().padEnd(cost.toString().length + 1, '0'))
  )
  Number(cost) === cost && cost % 1 === 0
    ? (withTip = cost + cost * (this.value * 0.01))
    : cost.toString().split('.')[1].length === 1
      ? (cost = parseFloat(
          cost.toString().padEnd(cost.toString().length + 1, '0')
        ))
      : (withTip = cost + cost * (this.value * 0.01))
  withTip = cost + cost * (this.value * 0.01)

  alert(
    'With tip, the total comes out to ' +
      parseFloat(withTip.toString()).toFixed(2)
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

function renderContributors() {}

totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
totalAmount.addEventListener('keydown', keyCheck)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)

// ******************************************************************

// The cost is only storing up to the tenths, not hundredths

// Have the outcome work for whole numbers without decimals

// Selecting a tax radio button after already doing
// it once is accumilating the total

function total2() {
  this.value.toString().split('.')[1].length === 1
    ? this.setAttribute('onkeydown', 'return false')
    : this.removeAttribute('onkeydown')
  cost = parseFloat(this.value)
  console.log(cost)
}

function checkCents() {
  console.log(cost, this.value)
  let tip = parseInt(this.value)
  !cost.toString().include('.')
    ? (cost = parseFloat(
        cost.toString().padEnd(`${cost.toString().length}` + 3, '.00')
      ))
    : plusTip(cost, tip)
}

// set a flag to check if a tip was already calculated
// if it was, subtract the original tip before re-calculating a new tip percentage
let tipped2 = false
function plusTip2() {
  cost.toString().split('.')[1].length === 1
    ? alert('You forgot about the cents!')
    : (cost = cost + cost * (tip * 0.01))
  alert(
    'With tip, the total comes out to ' + parseFloat(cost.toString()).toFixed(2)
  )
}
