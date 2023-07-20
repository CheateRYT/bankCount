let leavePressed = false;
let bankCount = {
  users : {},
  fill: function (money) {
    if (this.block === true) {
      console.log("Ваш счет заблокирован!");
      alert("Ваш счет временно заблокирован!");
    } else {
      let username = loginInputLogin.value;
      this.money += money;
      bankCount.users[username].money = this.money;
      console.log(`Вы пополнили ваш счет на ${money} `);
      localStorage.setItem("bankCount", JSON.stringify(bankCount));
    }
  },
  withdraw: function (money) {
    let username = loginInputLogin.value;
    bankCount.users[username].money = this.money;
    if (this.block === true) {
      console.log("Ваш счет заблокирован!");
      alert("Ваш счет временно заблокирован!");
    } else {
      if (money > this.money) {
        console.log("Недостаточно средств!");
        alert("У вас на счету недостаточно средств!");
      } else if (money > this.limit && bankCount.users[username].isAdmin != true) {
        // проверка на превышение лимита перед выводом
        console.log("Вы превысили лимит вывода!");
        alert("Вы превысили лимит вывода!");
        balanceBanBlock.innerHTML = "У вас временная блокировка!";
        this.block = true;

        let banAcc =setTimeout(
          function () {
            balanceBanBlock.innerHTML = "";
            console.log("Ваш счет разблокирован!");
            leavePressed ? console.log (''):alert("Ваш счет разблокирован !");
            this.block = false;
          }.bind(this),
          5000
        );
      } else {
        this.money -= money;
        console.log(`Поздравляю, вы успешно вывели ${money} рублей!`);
        this.withdraws.push(money);
        localStorage.setItem("bankCount", JSON.stringify(bankCount));
      }
    }
  },
  checkBalance: function () {
    if (this.money > 0) {
      balanceBlock.innerHTML = `Ваш баланс: ${this.money}`;
    } else {
      balanceBlock.innerHTML = "На счете отсутствуют средства !";
    }
  },
  checkWithdraw: function () {
    if (this.withdraws && this.withdraws.length > 0) {
      console.log(this.withdraws);
      withdrawCountBlock.innerHTML = `Выводы на нашем проекте: ${this.withdraws}`;
    } else {
      withdrawCountBlock.innerHTML = "Выводы на нашем проекте: нет данных";
    }
  },
};
let bankCountJSON = localStorage.getItem('bankCount');

// Проверка, есть ли сохраненное значение
console.log(bankCount)
if (bankCountJSON) {
  console.log(bankCount)
  // Преобразование значения из формата JSON обратно в объект или значение
  bankCount.users = JSON.parse(bankCountJSON).users;
  // Использование значения bankCount
  console.log(bankCount);
  // Если сохраненное значение отсутствует, выполняем соответствующие действия
}

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
  loginInputLogin = document.querySelector(".login-input-login"),
  loginInputPass = document.querySelector(".login-input-pass"),
  registerForm = document.querySelector(".register-form"),
  registerInputLogin = document.querySelector(".register-input-login"),
  registerInputPass = document.querySelector(".register-input-pass"),
  registerButton = document.querySelector(".register-button"),
  loginForm = document.querySelector(".login-form"),
  fillBalanceBlock = document.querySelector(".fillBalance"),
  withdrawMoneyBlock = document.querySelector(".withdrawMoney"),
  limitChangerBlock = document.querySelector(".limitChanger"),
  leaveBtn = document.querySelector(".leave"),
  adminCheckbox = document.getElementById('myCheckbox');
let loginInfoText = document.createElement("div");

let bankInterface = [
  balanceBlock,
  balanceBanBlock,
  loginInfoText,
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
    localStorage.setItem("bankCount", JSON.stringify(bankCount));
  } else {s
    input.value = "";
    alert("Введены неверные данные!");
  }
}

function enterLoginInput(loginInput, registerInput, method) {
  if (loginInput.value && loginInput.value.length < 56) {
    let username = loginInput.value;
    let password = registerInput.value;
    if (bankCount.users[username] && bankCount.users[username].password === password) {
      bankCount.money = bankCount.users[username].money;
      bankCount.blocks = bankCount.users[username].blocks;
      bankCount.withdraws = bankCount.users[username].withdraws;
      bankCount.limit = bankCount.users[username].limit;
      bankCount.isAdmin = bankCount.users[username].isAdmin;
      localStorage.setItem("bankCount", JSON.stringify(bankCount));
      method();
    } else {
      alert("Неверное имя пользователя или пароль");
    }
  }
}

//Login Form

function loginAdd() {
  enterLoginInput(loginInputLogin, loginInputPass, function () {
    let username = loginInputLogin.value;
    bankCount.money = bankCount.users[username].money;
    loginForm.classList.remove("login-form");
    loginForm.classList.add("hide");
    leavePressed = false;
    registerForm.classList.add("hide");
    loginInfoText.classList.add("loginInfoText", "hide");
    loginInfoText.innerHTML = `<div class="container">Ваш логин : ${loginInputLogin.value}</div>`;
    document.body.insertBefore(loginInfoText, document.body.firstChild);
    if (bankCount.users[username].isAdmin == true) {
      bankInterface.forEach((item) => {
        if (item != limitChangerBlock){
          item.classList.remove("hide");
        }
      });
    } else {
      bankInterface.forEach((item) => {
        item.classList.remove("hide");
      });
    }
    leaveBtn.classList.remove("hide");
    bankCount.checkWithdraw();
bankCount.checkBalance(); 
    localStorage.setItem("bankCount", JSON.stringify(bankCount));
  });
}

loginButton.addEventListener("click", function () {
  loginAdd();
  loginInputLogin.value.innerHTML = "";
  loginInputPass.value.innerHTML = "";
});

//Register
registerButton.addEventListener("click", () => {
  if (registerInputLogin.value != 0 && registerInputPass.value != 0) {
    let username = registerInputLogin.value;
    let password = registerInputPass.value;
    console.log(bankCount)
    if (bankCount.users[username]) {
      alert("Пользователь с таким именем уже существует");
      registerInputLogin.value = "";
      registerInputPass.value = "";
    } else {
      if (adminCheckbox.checked) {
        bankCount.users[username] = {
          password: password,
          money: 0,
          withdraws: [],
          blocks: false,
          limit: 100000,
          isAdmin: true
        };
        console.log(bankCount)  
        localStorage.setItem("bankCount", JSON.stringify(bankCount));
        alert("Регистрация выполнена успешно!");
  
        registerInputLogin.value = "";
        registerInputPass.value = "";
      } else {
        bankCount.users[username] = {
          password: password,
          money: 0,
          withdraws: [],
          blocks: false,
          limit: 100000,
          isAdmin: false,
        };
        console.log(bankCount)  
        localStorage.setItem("bankCount", JSON.stringify(bankCount));
        alert("Регистрация выполнена успешно!");
  
        registerInputLogin.value = "";
        registerInputPass.value = "";
      }
    }
  }
});




//Leave

leaveBtn.addEventListener("click", () => {
  bankInterface.forEach((item) => {
    item.classList.add("hide");
  });
  leaveBtn.classList.add("hide");
  loginForm.classList.remove("hide");
  loginForm.classList.add("login-form");
  registerForm.classList.remove("hide");
  registerForm.classList.add("register-form");
  leavePressed = true;
  alert("Вы успешно вышли с учетной записи!");
  localStorage.setItem("bankCount", JSON.stringify(bankCount));
});

//Fill money

fillButton.addEventListener("click", function () {
  enterInput(fillInput, function () {
    bankCount.fill(parseInt(fillInput.value));
    bankCount.checkWithdraw();
  bankCount.checkBalance();
  });
});

fillInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(fillInput, function () {
      bankCount.fill(parseInt(fillInput.value));
      bankCount.checkWithdraw();
  bankCount.checkBalance();
    });
  }
});

//Withdraw money

withdrawButton.addEventListener("click", function () {
  enterInput(withdrawInput, function () {
    bankCount.withdraw(parseInt(withdrawInput.value));
    bankCount.checkWithdraw();
  bankCount.checkBalance();
  });
});

withdrawInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(withdrawInput, function () {});
    bankCount.checkWithdraw();
  bankCount.checkBalance();
  }
});

//Limit Input

limitButton.addEventListener("click", function () {
  enterInput(limitInput, function () {
    bankCount.limit = limitInput.value;
    bankCount.checkWithdraw();
  bankCount.checkBalance();
  });
});

limitInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    //Enter
    enterInput(limitInput, function () {
      bankCount.limit = limitInput.value;
      bankCount.checkWithdraw();
  bankCount.checkBalance();
    });
  }
});
bankCount.checkWithdraw();
bankCount.checkBalance(); 