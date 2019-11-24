const colors = ['red', 'black']


const btn = document.querySelector('#playButton')
const colorPicker = document.querySelector("#colorPicker")
let userBank = 1000

const result = document.querySelector('#result')

btn.addEventListener('click', () => {

  let colorRandom = Math.floor(Math.random() * 2)
  let color = colorPicker.options[colorPicker.selectedIndex].value;
  console.log(color)

  let amount = parseFloat(document.querySelector('#betAmount').value)
  console.log(amount)

  if(userBank - amount < 0) {
    alert("You don't have enough money to make that bet");
    return;
  }
  let earnings
  let winText
  let won

  if (color === colors[colorRandom]) {
    earnings = (amount * 2);
    winText = `You Win $${earnings}`;
    won = true;
  } else {
    won = false;
    winText = `You Lose ${amount}`;
    earnings = -amount;
  }

  userBank += earnings;
  result.textContent = `${winText}. You now have $${userBank} money.`;

  fetch('userInput', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'won': won,
        'updateMoney': earnings
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
    })
});