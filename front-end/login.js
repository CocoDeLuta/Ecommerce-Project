const URL = "http://localhost/Sobjucas";

function log() {
  const fNome = document.getElementById("fNome");
  const fSenha = document.getElementById("fSenha");

  const pessoa = {
    nome: fNome.value,
    senha: fSenha.value
  };

  // Cliente HTTP faz a requisição para a API
  fetch(`${URL}/back-end/auth/auth.php`, {
    body: JSON.stringify(pessoa),
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.json().then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', data.admin);
        // console.log(localStorage.getItem('token'));
        alert("Logado com sucesso");
      ""
        window.location.assign("home.html");
        
      });
    } else if (res.status === 401) {""
      res.json().then((error) => {
        alert(error.message);
      });
    } else {
      alert("Ocorreu um erro na autenticação");
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