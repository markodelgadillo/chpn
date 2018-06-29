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
  console.log(typeof person.value)
  person.value === ''
    ? alert('You need to add a name!')
    : contributors.push({ name: person.value.trim(), paid: '$0.00' })
  person.value = ''

  // localStorage.setItem('contributors', JSON.stringify(contributors))
  console.log(contributors)
}

function renderContributors() {}

totalAmount.addEventListener('keyup', total)
totalAmount.addEventListener('keydown', keyCheck)
totalAmount.addEventListener('select', onSelect)
totalAmount.addEventListener('drag', onSelect)
tips.forEach(tip => tip.addEventListener('click', plusTip))
addPerson.addEventListener('click', addContributor)
