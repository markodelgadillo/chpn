const contributors = []
var cost

let totalAmount = document.querySelector('#total')
let tips = document.querySelectorAll('.tip')
// check by converting the number into a string then splitting
// it from the decimal point. Then save the characters after the
// decimal point. If the length is 2, then turn off the onkeydown
function total(totalAmount) {
  this.value.toString().split('.')[1].length === 1
    ? this.setAttribute('onkeydown', 'return false')
    : this.removeAttribute('onkeydown')

  cost = parseFloat(this.value)
}

// calcluate the total amount plus tip
function plusTip() {
  totalAmount.value.toString().split('.')[1].length === 1
    ? alert('You forgot about the cents!')
    : (cost = cost + cost * (this.value * 0.01))
  console.log(parseFloat(cost.toString()).toFixed(2))
}

function keyCheck(e) {
  if (e.keyCode === 8 && totalAmount.getAttribute('onkeydown')) {
    totalAmount.removeAttribute('onkeydown')
  }
}

totalAmount.addEventListener('keypress', total)
totalAmount.addEventListener('keydown', keyCheck)
tips.forEach(tip => tip.addEventListener('click', plusTip))
// tip.addEventListener('', plusTip)
