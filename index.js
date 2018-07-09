const contributors = []

var cost

let totalAmount = document.querySelector('.total')
let tips = document.querySelectorAll('.tip')
let personName = document.querySelector('#person-name')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')
let list = document.querySelector('.names')
var paying = document.querySelectorAll('.paying')
let amounts = document.querySelectorAll('.amount')
let newTotals = document.querySelectorAll('.newTotal')

// gets the inputted total and outputs
function total() {
  !this.value.includes('.')
    ? (cost = parseFloat(this.value))
    : this.value.split('.')[1].length === 2
      ? this.setAttribute('onkeydown', 'return false')
      : this.removeAttribute('onkeydown')
  payElse ? (this.personName.paid = cost) : (cost = parseFloat(this.value))
  !payElse
}

// checks if delete is pressed and if the input field is turned off
function keyCheck(e) {
  if (e.keyCode === 8 && totalAmount.getAttribute('onkeydown')) {
    totalAmount.removeAttribute('onkeydown')
  }
}

// called when selecting the total with dragging the cursor on it
// it will make the input open to additional inputs again
// then calls the total() after 250ms
function onSelect() {
  this.removeAttribute('onkeydown')
  window.setTimeout(total, 250)
}

// the value plus tip will be stored in this variable and available to other functions
var withTip

// is called when a radio button is selected
// and calculates the total plus the tip
function plusTip() {
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

function addContributor() {
  personName.value === ''
    ? alert('You need to add a name!')
    : contributors.push({
        name: personName.value.trim(),
        pay: '0.00',
        recalculate: false
      })
  personName.value = ''

  renderContributors(contributors, list)
  chippedIn ? eachPay() : ''
}

function toggle(e) {
  let id = parseInt(e.target.dataset.id)
  console.log(id)
  e.target.matches('.change') ? (payElse = !payElse) : ''
  console.log(payElse)
  renderContributors(contributors, list)
}

// flag
var payElse = false

function renderContributors() {
  list.innerHTML = contributors
    .map((name, i) => {
      return `
    <li class="paying" data-id =${i}>
      <button class="delete" data-id=${i}>${'X'}</button>
      <span>${name.name}</span>
      ${
        payElse
          ? `<input class="newTotal" type="number" placeholder="${
              name.pay
            }" data-id=${i}>`
          : `<divs class = "amount"><span>${'$'}${
              name.pay
            }</span><button class="change" data-id=${i}>${'X'}</button></div>`
      }
    </li>
    `
    })
    .join('')
}

function deleteName(e) {
  let id = parseInt(e.target.dataset.id)
  e.target.matches('.delete') ? contributors.splice(id, 1) : ''
  contributors.length ? eachPay() : ''
  renderContributors(contributors, list)
}

// if the chpN button has been pressed, this will change to true
let chippedIn = false

function eachPay() {
  let splitTotal = Math.ceil(100 * (withTip / contributors.length)) / 100
  splitTotal.toString().split('.')[1].length === 1
    ? (splitTotal = parseFloat(
        splitTotal.toString().padEnd(splitTotal.toString().length + 1, '0')
      ).toFixed(2))
    : ''
  !chippedIn ? (chippedIn = true) : ''
  renderEachPay(splitTotal)
}

function renderEachPay(x) {
  contributors.map(name => (name.pay = x))
  renderContributors()
}

// use a new function for this input field
newTotals
  ? newTotals.forEach(newTotal => newTotal.addEventListener('keyup', total))
  : ''
newTotals
  ? newTotals.forEach(newTotal =>
      newTotal.addEventListener('keydown', keyCheck)
    )
  : ''
calculate.addEventListener('click', eachPay)
list.addEventListener('click', toggle)
list.addEventListener('click', deleteName)
totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('keydown', keyCheck)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
