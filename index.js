const contributors = []

var cost

let totalAmount = document.querySelector('.total')
let tips = document.querySelectorAll('.tip')
let personName = document.querySelector('#person-name')
let addPerson = document.querySelector('#add')
let calculate = document.querySelector('#calculate')
let list = document.querySelector('.names')
var paying = document.querySelectorAll('.paying')
var remove

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

  // localStorage.setItem('contributors', JSON.stringify(contributors))
  console.log(contributors)
  renderContributors(contributors, list)
}

// function to have a contributor pay a different amount
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
  // chipIn()
}

// function to calculate the split amounts and render them
// function chipIn() {}

// use the data-id value of this to delete from the array using array.splice
function deleteName(e) {
  let id = parseInt(e.target.dataset.id)
  console.log(id, id + 1)
  !e.target.matches('button') ? '' : contributors.splice(id, 1)
  renderContributors(contributors, list)
}

list.addEventListener('click', deleteName)
totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('keydown', keyCheck)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
