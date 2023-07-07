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
        //window.location.assign("");
        
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