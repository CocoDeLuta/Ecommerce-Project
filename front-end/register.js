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

  const pessoa = {
    nome: fNome.value,
    senha: fSenha.value,
    email: fEmail.value,
    nascimento: fData.value
  };


  fetch(`${URL}/api/user/create.php`, {
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
        window.location.assign("");
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
