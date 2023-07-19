const bankCount = {
  money: 0,
  limit: 100000,
  block: false,
  userName: "",
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
      } else if (money > this.limit) {
        // проверка на превышение лимита перед выводом
        console.log("Вы превысили лимит вывода!");
        alert("Вы превысили лимит вывода!");
        balanceBanBlock.innerHTML = "У вас временная блокировка!";
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
  checkBalance: function () {
    if (this.money > 0) {
      balanceBlock.innerHTML = `Ваш баланс: ${this.money}`;
    } else {
      balanceBlock.innerHTML = "На счету нету средств !";
    }
  },
  checkWithdraw: function () {
    if (this.withdraws.length > 0) {
      withdrawCountBlock.innerHTML = `Выводы на нашем проекте: ${this.withdraws}`;
    } else {
      withdrawCountBlock.innerHTML = "Выводы на нашем проекте: нет данных";
    }
  },
};

//Withdraws and Balance Block

const withdrawCountBlock = document.querySelector(".withdrawsCount"),
  balanceBlock = document.querySelector(".balance"),
  balanceBanBlock = document.querySelector(".balanceBan"),
  limitButton = document.querySelector(".limitButton"),
  limitInput = document.querySelector(".limitInput"),
  fillButton = document.querySelector(".fillButton"),
  fillInput = document.querySelector(".fillInput"),
  withdrawInput = document.querySelector(".withdrawInput"),
  withdrawButton = document.querySelector(".withdrawButton"),
  loginButton = document.querySelector(".login-button"),
  loginInput = document.querySelector(".login-input"),
  loginForm = document.querySelector(".login-form"),
  fillBalanceBlock = document.querySelector(".fillBalance"),
  withdrawMoneyBlock = document.querySelector(".withdrawMoney"),
  limitChangerBlock = document.querySelector(".limitChanger");

let bankInterface = [
  balanceBlock,
  withdrawCountBlock,
  fillBalanceBlock,
  withdrawMoneyBlock,
  limitChangerBlock,
];

//Enter Input system
function enterInput(input, method) {
  if (input.value && input.value > 0 && !isNaN(input.value)) {
    method();
    input.value = "";
  } else {
    input.value = "";
  }
}

function enterLoginInput(input, method) {
  if (input.value && input.value.length < 56) {
    method();
    alert("Вход успешно выполнен!");
    input.value = "";
  } else {
    alert("Введите правильные данные!");
    input.value = "";
  }
}

//Login Form

loginButton.addEventListener("click", function () {
  enterLoginInput(loginInput, function () {
    bankCount.userName = loginInput.value;
    loginForm.classList.remove("login-form");
    loginForm.innerHTML = "";
    let loginInfoText = document.createElement("div");
    loginInfoText.classList.add("loginInfoText");
    loginInfoText.innerHTML = `<div class="container">Ваш логин : ${loginInput.value}</div>`;
    document.body.insertBefore(loginInfoText, document.body.firstChild);
    bankInterface.forEach((item) => {
      item.classList.remove("hide");
    });
  });
});

loginInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterLoginInput(loginInput, function () {
      bankCount.userName = loginInput.value;
      loginForm.classList.remove("login-form");
      loginForm.innerHTML = "";
      let loginInfoText = document.createElement("div");
      loginInfoText.classList.add("loginInfoText");
      loginInfoText.innerHTML = `<div class="container">Ваш логин : ${loginInput.value}</div>`;
      document.body.insertBefore(loginInfoText, document.body.firstChild);
      bankInterface.forEach((item) => {
        item.classList.remove("hide");
      });
    });
  }
});

//Login Info text

//Fill money

fillButton.addEventListener("click", function () {
  enterInput(fillInput, function () {
    bankCount.fill(parseInt(fillInput.value));
  });
});

fillInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(fillInput, function () {
      bankCount.fill(parseInt(fillInput.value));
    });
  }
});

//Withdraw money

withdrawButton.addEventListener("click", function () {
  enterInput(withdrawInput, function () {
    bankCount.withdraw(parseInt(withdrawInput.value));
  });
});

withdrawInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(withdrawInput, function () {
      bankCount.withdraw(parseInt(withdrawInput.value));
    });
  }
});

//Limit Input

limitButton.addEventListener("click", function () {
  enterInput(limitInput, function () {
    bankCount.limit = limitInput.value;
  });
});

limitInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(limitInput, function () {
      bankCount.limit = limitInput.value;
    });
  }
});

bankCount.checkWithdraw();
bankCount.checkBalance();
