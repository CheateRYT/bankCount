var users = {}; // Объект для хранения зарегистрированных пользователей

function login() {
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;

  if (users[username] && users[username].password === password) {
    alert("Вход выполнен успешно!");
  } else {
    alert("Неверное имя пользователя или пароль");
  }
}

function register() {
  var username = document.getElementById("registrationUsername").value;
  var password = document.getElementById("registrationPassword").value;

  if (users[username]) {
    alert("Пользователь с таким именем уже существует");
  } else {
    users[username] = { password: password };
    alert("Регистрация выполнена успешно!");
  }
}