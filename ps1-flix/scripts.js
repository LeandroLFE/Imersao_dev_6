"use strict";

/*
 * Consts
 **/

const games = [
  {
    trailer: "6Bk8-Eyu52o",
    cover:
      "https://rubberchickengames.com/wp-content/uploads/2019/12/B69zEhWZA8UCHxjagwibdXCLMYNxrPY6YRrJip9MJs1BJnSbXSfoQUEKGU6Z31tqtVCCV2cP6V5Dy3mDsEr6aaQiMBmuZUZeiCMTfrAi.jpg",
  },
  {
    trailer: "fTzU3A2I7BU",
    cover: "https://m.media-amazon.com/images/I/61MV1JtcClL.jpg",
  },
  {
    trailer: "pxyePoT1Su0",
    cover:
      "https://cdn.awsli.com.br/600x450/1765/1765584/produto/79978603ac0466cc5c.jpg",
  },
  {
    trailer: "CQ8m0HUDG0Y",
    cover:
      "https://static.wikia.nocookie.net/digimon/images/f/f6/Digimonworld.jpg",
  },
  {
    trailer: "z7fhvnjo-Hs",
    cover:
      "https://upload.wikimedia.org/wikipedia/pt/4/4c/Metal_Gear_Solid_-_North-american_cover.jpg",
  },
];

const videoFormats = [
  {
    base: "youtube.",
    idStart: "com/watch?v=",
    idFinish: "&",
  },
  {
    base: "youtu.",
    idStart: "be/",
    idFinish: "?",
  },
];

const acceptedTypes = ["jpg", "jpe", "jpeg", "png", "gif", "CAU"];
const inputCover = document.getElementById("cover-input");
const inputTrailer = document.getElementById("trailer-input");
const btnAdd = document.getElementById("btn-add");

const gameListContainer = document.getElementById("game-list");
const overlay = document.getElementById("overlay");
const trailerContainer = document.getElementById("iframe-container");
const btnClose = document.getElementById("btn-close");

// /*
//  * Listeners
//  **/

window.onclick = function (event) {
  if (event.target === overlay) {
    closeTrailer();
  }
};

window.onload = () => {
  games.map(({ cover, trailer }, index) => {
    updateDOM(cover, trailer, index);
  });

  btnAdd.addEventListener("click", () => {
    insertGame(inputCover.value, inputTrailer.value, games.length);
  });

  btnClose.addEventListener("click", () => {
    closeTrailer();
  });
};

/**
 *  Functions
 **/

function showTrailer(videoId) {
  overlay.style.display = "block";
  player.loadVideoById({ videoId, suggestedQuality: "large" });
}

function closeTrailer() {
  player.stopVideo();
  overlay.style.display = "none";
}

function checkFieldsAndUrl(newCover, newTrailer) {
  if (!newCover || !newTrailer) {
    alert("URL da capa ou URL do trailer sem preenchimento");
    return false;
  }
  if (!acceptedTypes.includes(newCover.slice(-3))) {
    alert(
      "URL da capa inválida, verifique se é o link de uma imagem e tente novamente"
    );
    return false;
  }

  if (videoFormats.filter((v) => newTrailer.includes(v.base)).length !== 1) {
    alert("URL do trailer inválido, verifique se é do youtube mesmo");
    return false;
  }
  return true;
}

function getVideoIdFromURL(url) {
  const urlFormat = videoFormats.filter((v) => url.includes(v.base))[0];
  const idStart = url.indexOf(urlFormat.idStart) + urlFormat.idStart.length;
  const idFinish = url.indexOf(urlFormat.idFinish);

  if (idFinish === -1) {
    return url.substring(idStart);
  }
  return url.substring(idStart, idFinish);
}

function insertGame(newCover, newTrailer, id) {
  if (!checkFieldsAndUrl(newCover, newTrailer)) {
    return false;
  }
  const videoId = getVideoIdFromURL(newTrailer);
  games.push({ cover: newCover, trailer: videoId });
  updateDOM(newCover, videoId, id);
  alert('O jogo foi inserido com sucesso no catálogo')
  return true;
}

function removeGame(id) {
  try {
    gameListContainer.innerHTML = "";
    delete games[id];
    games.map(({ cover, trailer }, index) => updateDOM(cover, trailer, index));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function updateDOM(newCover, videoId, id) {
  const divCover = document.createElement("div");
  const a = document.createElement("a");
  const img = document.createElement("img");
  const divButton = document.createElement("div");
  const btnDel = document.createElement("button");

  divCover.classList.add(["cover"]);
  divCover.setAttribute("id", "img" + id);

  img.setAttribute("src", newCover);

  a.classList.add(["link-trailer"]);
  a.addEventListener("click", () => showTrailer(videoId));

  divButton.classList.add(["container__delete"]);

  btnDel.setAttribute("id", "btn" + id);
  btnDel.innerHTML = "Excluir";
  btnDel.addEventListener("click", () => removeGame(id));

  a.appendChild(img);
  divCover.appendChild(a);
  divButton.appendChild(btnDel);
  divCover.appendChild(divButton);
  gameListContainer.appendChild(divCover);

  inputCover.value = '';
  inputTrailer.value = '';

  return true;
}
