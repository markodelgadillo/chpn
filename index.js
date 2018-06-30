const contributors = []

var cost

let totalAmount = document.querySelector('.total')
let tips = document.querySelectorAll('.tip')
let personName = document.querySelector('#person-name')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')
let list = document.querySelector('.names')
let paying = document.querySelectorAll('.paying')

function total() {
  !this.value.includes('.')
    ? (cost = parseFloat(this.value))
    : this.value.split('.')[1].length === 2
      ? this.setAttribute('onkeydown', 'return false')
      : this.removeAttribute('onkeydown')
  cost = parseFloat(this.value)
  payMoreLess ? (personName.paid = cost) : ''
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

function plusTip() {
  let withTip
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
    : contributors.push({ name: personName.value.trim(), paid: 'How much?' })
  personName.value = ''

  // localStorage.setItem('contributors', JSON.stringify(contributors))
  console.log(contributors)
  renderContributors(contributors, list)
}

function toggle(e) {
  e.preventDefault
  !payMoreLess
}

var payMoreLess = false

function renderContributors(contributors = [], list) {
  list.innerHTML = contributors
    .map((name, i) => {
      return `
    <li class="paying">
      <button id="delete">${'X'}</button>
      <span>${name.name}</span>
      ${payMoreLess ? totalAmount : `<span>${name.paid}</span>`}
    </li>
    `
    })
    .join('')
}

totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('keydown', keyCheck)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
paying.addEventListener('click', toggle)
