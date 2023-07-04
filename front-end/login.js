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
    mode: "no-cors",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      alert("Logado com sucesso");

      res.json().then((data) => {
        addTableRow(data);
      });
    } else if (res.status === 401) {
      res.json().then((error) => {
        alert(error.message);
      });
    } else {
      alert("Ocorreu um erro na autenticação");
    }
  });
}