const URL = "http://localhost/Sobjucas";

function register() {
  const fNome = document.getElementById("fNome");
  const fSenha = document.getElementById("fSenha");
  const fConfirmSenha = document.getElementById("fConfirmSenha");
  const fEmail = document.getElementById("fEmail");
  const fData = document.getElementById("fData");

  if (fConfirmSenha.value != fSenha.value){
    alert("Senhas tem que ser iguais");
    return;
  }

  if (fNome.value == "" || fSenha.value == "" || fEmail.value == "" || fData.value == "") {
    alert("Preencha todos os campos!");
    return;
  }

  const pessoa = {
    nome: fNome.value,
    senha: fSenha.value,
    email: fEmail.value,
    nascimento: fData.value
  };


  fetch(`${URL}/back-end/api/user/create.php`, {
    body: JSON.stringify(pessoa),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.json().then((data) => {
        // console.log(localStorage.getItem('token'));
        alert("Registrado com sucesso");
        window.location.assign("home.html");
      });
    } else if (res.status === 401) {
      res.json().then((error) => {
        alert(error.message);
      });
    } else {
      alert("Ocorreu um erro, tente novamente");
    }
  });

}

function validateAdmin() {
  let admin = localStorage.getItem("admin");
  console.log(admin);
  if (admin != 1) {
    link = document.getElementById("adm").href="home.html";
    //console.log(link);
    alert("Você não tem permissão para acessar essa página");
    window.location.assign("home.html");
  }
}

function isLogged() {
  let token = localStorage.getItem("token");
  console.log(token);
  if (token == null) {
    link = document.getElementById("carrinho").href = "home.html";
    console.log(link);
    alert("Você não está logado");
    window.location.assign("home.html");
  }
}

function logOut() {
  let a = localStorage.getItem('token');
  if (!a) {
    alert("Você não está logado");
    window.location.assign("home.html");
  }
  else {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.assign("home.html");
    alert("Você foi deslogado");
  }
}
