const bankCount = {
  money : 0,
  limit : 100000,
  block : false,
  withdraws : [],
  fill : function(money) {
    if(this.block === true) {
      console.log('Ваш счет заблокирован!')
    } else {
      console.log(`Вы пополнили ваш счет на ${money} `);
      this.money += money;
      checkBalance ()
    }
  },
  withdraw : function(money) {
    if(this.block === true) {
      console.log('Ваш счет заблокирован!')
    } else {
      if (money >= this.limit) {
        console.log("Вы превысили лимит вывода. Ваш счет временно заблокирован");
        this.block = true;
        setTimeout(function() {
          console.log('Ваш счет разблокирован!');
          this.block = false;
        }.bind(this), 5000);
      } else {
        if (money > this.money) {
          console.log('Недостаточно средств!')
        } else {
          this.money -= money;
          console.log(`Поздравляю, вы успешно вывели ${money} рублей!`);
          this.withdraws.push(money);
          checkWithdraw();
        }
      }
    }
  },
  check : function() {
    console.log(`У вас на счету ${this.money}`);
    checkBalance ()
  }
}
//Withdraws and Balance Block

const withdrawBlock = document.querySelector('.withdraws'),
      balanceBlock = document.querySelector('.balance');


function checkBalance () {
  if(bankCount.money > 0) {
    balanceBlock.innerHTML = `Ваш баланс: ${bankCount.money}`;
  } else {
    balanceBlock.innerHTML = 'У вас нету баланса !';
  }
}

function checkWithdraw () {
  if (bankCount.withdraws.length > 0) {
    withdrawBlock.innerHTML = `Выводы на нашем проекте: ${bankCount.withdraws}`;
  } else {
    withdrawBlock.innerHTML = 'Выводы : нет данных';
  }
}

// FillBalance

const fillButton = document.querySelector('.fillButton'),
      fillInput = document.querySelector('.fillInput');

fillButton.addEventListener('click', () => {
  if (fillInput.value && fillInput.value.length > 0 && !isNaN(fillInput.value)){
bankCount.fill(parseInt(fillInput.value))
fillInput.value = '';
  } else {
    fillInput.value = '';
  }
})

checkWithdraw();
checkBalance();