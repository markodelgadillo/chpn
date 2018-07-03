const contributors = []

var cost

let totalAmount = document.querySelector('.total')
let tips = document.querySelectorAll('.tip')
let personName = document.querySelector('#person-name')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')
let list = document.querySelector('.names')
var paying = document.querySelectorAll('.paying')

function total() {
  !this.value.includes('.')
    ? (cost = parseFloat(this.value))
    : this.value.split('.')[1].length === 2
      ? this.setAttribute('onkeydown', 'return false')
      : this.removeAttribute('onkeydown')
  cost = parseFloat(this.value)
  payMoreLess ? (personName.paid = cost) : ''
  !payMoreLess
  console.log(typeof cost, cost)
}

function keyCheck(e) {
  if (e.keyCode === 8 && totalAmount.getAttribute('onkeydown')) {
    totalAmount.removeAttribute('onkeydown')
  }
}

function onSelect() {
  this.removeAttribute('onkeydown', 'return false')
  window.setTimeout(total, 250)
}

var withTip
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
        pay: '',
        recalculate: false
      })
  personName.value = ''

  renderContributors(contributors, list)
}

function toggle(e) {
  e.preventDefault
  !payElse
}

var payElse = false

function renderContributors() {
  list.innerHTML = contributors
    .map((name, i) => {
      return `
    <li class="paying" data-id =${i}>
      <button class="delete" data-id=${i}>${'X'}</button>
      <span>${name.name}</span>
      ${payElse ? totalAmount : `<div>${name.pay}</div>`}
    </li>
    `
    })
    .join('')
}

function deleteName(e) {
  let id = parseInt(e.target.dataset.id)
  !e.target.matches('button') ? '' : contributors.splice(id, 1)
  eachPay()
  renderContributors(contributors, list)
}

function eachPay() {
  let splitTotal = Math.ceil(100 * (withTip / contributors.length)) / 100
  splitTotal.toString().split('.')[1].length === 1
    ? (splitTotal = parseFloat(
        splitTotal.toString().padEnd(splitTotal.toString().length + 1, '0')
      ))
    : ''
  alert('Each person owes ' + splitTotal)

  renderEachPay(splitTotal)
}

function renderEachPay(x) {
  contributors.map(name => (name.pay = x))
  renderContributors()
}

calculate.addEventListener('click', eachPay)
list.addEventListener('click', deleteName)
totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('keydown', keyCheck)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
