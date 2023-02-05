alert("Olá");

const numeroSecreto = Math.floor(Math.random() * 1000) + 1;

let numeroInformado = -1;
let tentativas = 7;

while (numeroInformado !== 0 && tentativas !== 0) {
  const textoInformado = prompt(
    `Digite um número entre 1 e 1000\nvocê possui ${tentativas} tentativas\nmas pode desistir a qualquer momento pressionando o número 0`
  );

  numeroInformado = textoInformado ? parseInt(textoInformado) : 0;

  if (
    (numeroSecreto > numeroInformado && numeroInformado !== 0) ||
    numeroSecreto < numeroInformado
  ) {
    const maiorMenor = numeroSecreto < numeroInformado ? "menor" : "maior";
    tentativas--;
    if (tentativas > 0) {
      alert(
        `Que pena, você errou, o número é ${maiorMenor}. Você possui ${tentativas} tentativas `
      );
    }
  } else if (numeroSecreto === numeroInformado) {
    alert("Parabéns!! Você acertou!");
    break;
  }
}

if (numeroInformado === 0 || tentativas === 0) {
  alert(`Que pena, você perdeu! O número era o ${numeroSecreto}!`);
}
