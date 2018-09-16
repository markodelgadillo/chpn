const contributors = []

var cost

let totalAmount = document.querySelectorAll('.total')
let tips = document.querySelectorAll('.tip')
let personName = document.querySelector('#person-name')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')
let list = document.querySelector('.names')
var paying = document.querySelectorAll('.paying')
let amounts = document.querySelectorAll('.amount')

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

  totalAmount.forEach(function(input) {
    if (!input.value) {
      input.setAttribute('placeholder', 'No value entered yet.')
    }
  })

  grandTotal(withTip)

  // totalAmount.forEach(function(input) {
  //   if (input.value) {
  //     input.value = ''
  //     input.setAttribute(
  //       'placeholder',
  //       withTip.toFixed(2)
  //       // parseFloat(withTip.toString()).toFixed(2)
  //     )
  //   }
  // })
}

function grandTotal(withTip) {
  let gTotal = withTip.toFixed(2)
  document.getElementById('grand-total').innerHTML = `<span>${gTotal}</span>`
}

function addContributor() {
  if (totalAmount[0].getAttribute('placeholder') === '') {
    alert('Please enter a total for the bill first :)')
  } else {
    personName.value === ''
      ? alert('You need to add a name!')
      : contributors.push({
          name: personName.value.trim(),
          pay: '',
          recalculate: true
        })
    personName.value = ''
  }

  // renderContributors(contributors, list)
  if (contributors.length) {
    eachPay()
  }
}

// CONVERT THE TERNARY INTO IF STATEMENT THAT WILL HAVE AN IF else
// THAT CHECKS FOR RECALCULATE TO BE FALSE AND IF THE INPUT HAS A VALUE

function renderContributors() {
  console.log(contributors)
  list.innerHTML = contributors
    .map((name, i) => {
      return `
    <li class="paying" data-id =${i}>
      <button class="delete"><div class="content" data-id=${i}>${'X'}</div></button>
      <span>${name.name}</span>
      ${
        !contributors[i].recalculate
          ? `<input class="new total" type="number" placeholder="${
              name.pay
            }" data-id=${i}/>`
          : `<div class = "amount">${'$'}${name.pay}</div>`
      }
      <button class="setAmount" data-id=${i}></button>
    </li>
    `
    })
    .join('')

  if (contributors.length === 1 && !clickAdded) {
    document.querySelector('.setAmount').addEventListener('click', toggle)
  } else if (contributors.length > 1 && !clickAdded) {
    document
      .querySelectorAll('.setAmount')
      .forEach(btn => btn.addEventListener('click', toggle))
  }
}
// THE ISSUE IS WHEN IS RECALCULATE SET BACK TO TRUE
// OR HOW TO GETTING THE VALUE FROM THE PERSON WHEN IT'S SET TO FALSE???
var clickAdded = false
// this is calling renderContributors() two times... why???
function toggle(e) {
  let id = parseInt(e.target.dataset.id)
  if (contributors[id].recalculate) {
    contributors[id].recalculate = false
  } else {
    contributors[id].pay = parseFloat(list.querySelector('.new.total').value)
    console.log(contributors)
    contributors[id].recalculate = true
  }
  renderContributors()
  console.log(1)

  // e.target.matches('#setAmount') ? (payElse = !payElse) : ''
  // console.log(payElse)
}

// flag
var payElse = false
// this is also calling renderContributors() two times... why???
function deleteName(e) {
  let id = parseInt(e.target.dataset.id)
  e.target.matches('.delete .content') ? contributors.splice(id, 1) : ''
  contributors.length ? eachPay() : ''
  renderContributors()
}

// if the chpN button has been pressed, this will change to true

function eachPay() {
  // contributors.forEach(function(person) {
  //   if ((person.recalculate = false)) {
  //     person.recalculate = true
  //   }
  // })
  let splitTotal = Math.ceil(100 * (withTip / contributors.length)) / 100
  splitTotal.toString().split('.')[1].length === 1
    ? (splitTotal = parseFloat(
        splitTotal.toString().padEnd(splitTotal.toString().length + 1, '0')
      ).toFixed(2))
    : ''
  renderEachPay(splitTotal)
}

function renderEachPay(x) {
  contributors.map(name => (name.pay = x))
  renderContributors()
}

list.addEventListener('click', deleteName)
totalAmount.forEach(input => input.addEventListener('keyup', total))
totalAmount.forEach(input => input.addEventListener('keydown', keyCheck))
totalAmount.forEach(input => input.addEventListener('select', onSelect))
totalAmount.forEach(input => input.addEventListener('drag', onSelect))
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
