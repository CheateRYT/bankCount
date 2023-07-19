const bankCount = {
  money: 0,
  limit: 100000,
  block: false,
  withdraws: [],
  fill: function (money) {
    if (this.block === true) {
      console.log("Ваш счет заблокирован!");
      alert("Ваш счет временно заблокирован!");
    } else {
      console.log(`Вы пополнили ваш счет на ${money} `);
      this.money += money;
      this.checkBalance();
    }
  },
  withdraw: function (money) {
    if (this.block === true) {
      console.log("Ваш счет заблокирован!");
      alert("Ваш счет временно заблокирован!");
    } else {
      if (money > this.money) {
        console.log("Недостаточно средств!");
        alert("У вас на счету недостаточно средств!");
      } else if (money > this.limit) { // проверка на превышение лимита перед выводом
        console.log("Вы превысили лимит вывода!");
        alert("Вы превысили лимит вывода!");
        balanceBanBlock.innerHTML = 'У вас временная блокировка!'
        this.block = true; 
        setTimeout( 
          function () { 
            balanceBanBlock.innerHTML = ""; 
            console.log("Ваш счет разблокирован!"); 
            alert("Ваш счет разблокирован !"); 
            this.block = false; 
          }.bind(this), 
          5000 
        ); 
      } else {
        this.money -= money;
        console.log(`Поздравляю, вы успешно вывели ${money} рублей!`);
        this.withdraws.push(money);
        this.checkWithdraw();
        this.checkBalance();
      }
    }
  },
  check: function () {
    console.log(`У вас на счету ${this.money}`);
    this.checkBalance();
  },
  checkBalance: function () {
    if (this.money > 0) {
      balanceBlock.innerHTML = `Ваш баланс: ${this.money}`;
    } else {
      balanceBlock.innerHTML = "На счету нету средств !";
    }
  },
  checkWithdraw: function () {
    if (this.withdraws.length > 0) {
      withdrawBlock.innerHTML = `Выводы на нашем проекте: ${this.withdraws}`;
    } else {
      withdrawBlock.innerHTML = "Выводы на нашем проекте: нет данных";
    }
  }
};

//Withdraws and Balance Block

const withdrawBlock = document.querySelector(".withdraws"),
  balanceBlock = document.querySelector(".balance"),
  balanceBanBlock = document.querySelector(".balanceBan"),
  limitButton = document.querySelector(".limitButton"),
  limitInput = document.querySelector(".limitInput");


// FillBalance

const fillButton = document.querySelector(".fillButton"),
  fillInput = document.querySelector(".fillInput");

fillButton.addEventListener("click", () => {
  if (
    fillInput.value &&
    fillInput.value.length > 0 &&
    !isNaN(fillInput.value)
  ) {
    bankCount.fill(parseInt(fillInput.value));
    fillInput.value = "";
  } else {
    fillInput.value = "";
  }
});

//Withdraw money

const withdrawInput = document.querySelector(".withdrawInput"),
  withdrawButton = document.querySelector(".withdrawButton");

withdrawButton.addEventListener("click", () => {
  if (
    withdrawInput.value &&
    withdrawInput.value.length > 0 &&
    !isNaN(withdrawInput.value)
  ) {
    bankCount.withdraw(parseInt(withdrawInput.value));
    withdrawInput.value = "";
  } else {
    withdrawInput.value = "";
  }
});
limitButton.addEventListener("click", () => {
  if (
    limitInput.value &&
    limitInput.value.length > 0 &&
    !isNaN(limitInput.value)
  ) {
    bankCount.limit = limitInput.value;
    limitInput.value = "";
  } else {
    limitInput.value = "";
  }
});

bankCount.checkWithdraw();
bankCount.checkBalance();