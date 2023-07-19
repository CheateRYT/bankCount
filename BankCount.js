const bankCount = {
  limit: 100000,
  fill: function (money) {
    if (this.block === true) {
      console.log("Ваш счет заблокирован!");
      alert("Ваш счет временно заблокирован!");
      
    } else {
      console.log(`Вы пополнили ваш счет на ${money} `);
      this.money += money;
      this.checkBalance();
      let username = loginInputLogin.value;
      bankCount[username].money = this.money;
      
    }
  },
  withdraw: function (money) {
    let username = loginInputLogin.value;
    bankCount[username].money = this.money;
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
  loginInputLogin = document.querySelector(".login-input-login"),
  loginInputPass = document.querySelector(".login-input-pass"),
  registerForm = document.querySelector('.register-form'),
  registerInputLogin = document.querySelector(".register-input-login"),
  registerInputPass = document.querySelector(".register-input-pass"),
  registerButton = document.querySelector('.register-button'),
  loginForm = document.querySelector(".login-form"),
  fillBalanceBlock = document.querySelector(".fillBalance"),
  withdrawMoneyBlock = document.querySelector(".withdrawMoney"),
  limitChangerBlock = document.querySelector(".limitChanger"),
  leaveBtn = document.querySelector('.leave');
  

let loginInfoText = document.createElement("div");

let bankInterface = [
  balanceBlock,
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
  } else {
    input.value = "";
    alert("Введены неверные данные!");
  }
}

function enterLoginInput(loginInput,registerInput ,method) {
  if (loginInput.value && loginInput.value.length < 56) {
    let username = loginInput.value;
    let password = registerInput.value;
    if (bankCount[username] && bankCount[username].password === password) {
      method();
      bankCount.money = bankCount[username].money;
      bankCount.blocks = bankCount[username].blocks;
      bankCount.withdraws = bankCount[username].withdraws;
    } else {
      
      alert("Неверное имя пользователя или пароль");
    }
  }
  }

//Login Form

function loginAdd () {
  enterLoginInput(loginInputLogin, loginInputPass, function () {
    loginForm.classList.remove("login-form");
    loginForm.classList.add('hide');
    registerForm.classList.add('hide')
    loginInfoText.classList.add("loginInfoText", 'hide');
    loginInfoText.innerHTML = `<div class="container">Ваш логин : ${loginInputLogin.value}</div>`;
    document.body.insertBefore(loginInfoText, document.body.firstChild);
    bankInterface.forEach((item) => {
      item.classList.remove("hide");
    });
    leaveBtn.classList.remove('hide')
    let username = loginInputLogin.value;
    bankCount.money = bankCount[username].money;
  });
}

loginButton.addEventListener("click", function () {
  loginAdd();
});



//Register 
registerButton.addEventListener('click', ()=> {
  if (registerInputLogin.value != 0 && registerInputPass.value != 0) {
    let username = registerInputLogin.value;
    let password = registerInputPass.value;
  
      if (bankCount[username]) {
        alert("Пользователь с таким именем уже существует");
      } else {
        bankCount[username] = { password: password, money: 0, withdraws: [ ], blocks: false};
        alert("Регистрация выполнена успешно!");
      }
  }
})


//Leave


leaveBtn.addEventListener('click', () => {
  bankInterface.forEach((item) => {
    item.classList.add("hide");
  });
  leaveBtn.classList.add('hide')
  loginForm.classList.remove('hide')
  loginForm.classList.add('login-form')
  registerForm.classList.remove('hide')
  registerForm.classList.add('register-form')
  alert("Вы успешно вышли с учетной записи!")
})

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

setInterval(function() {
  bankCount.checkWithdraw();
}, 1);

setInterval(function() {
  bankCount.checkBalance();
}, 1);
