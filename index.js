const contributors = []
let cost

let totalAmount = document.querySelector('#total')
let tip = document.querySelectorAll('.tip')
// check by converting the number into a string then splitting
// it from the decimal point. Then save the characters after the
// decimal point. If the length is 2, then turn off the onkeydown
function total(totalAmount) {
  // console.log(parseFloat(this.value).toFixed(2))
  this.value.toString().split('.')[1].length === 2
    ? this.setAttribute('onkeydown', 'return false')
    : this.removeAttribute('onkeydown', '')

  cost = parseFloat(this.value)
}

// calcluate the total amount plus tip
function plusTip(cost) {
  cost = cost + cost * tip.childNode.value
}

totalAmount.addEventListener('keyup', total)
tip.addEventListener('', plusTip)
