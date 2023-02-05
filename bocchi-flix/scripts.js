/*
 * Consts
 **/

const animes = [
  [
    "https://gifdb.com/images/high/cute-anime-hitori-bocchi-crying-b9s4y9a5uwam8obx.gif",
    "Hitoribocchi no Marumaru Seikatsu",
  ],
  [
    "https://media.tenor.com/q3H6BzODyJAAAAAC/bocchi-bocchi-the-rock.gif",
    "Bocchi the Rock",
  ],
  [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYuk_uOe6HHmVIr7qfZcCmPuPY-qdbiiol5w&usqp=CAU",
    "Komi-san wa, Community-shou desu",
  ],
  [
    "https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/ba93ce07c6039e72a3ca7976e4b62e21.jpe",
    "The Ice Guy and His Cool Female Colleague",
  ],
  [
    "https://upload.wikimedia.org/wikipedia/en/0/03/Slow_Loop_volume_1_cover.jpg",
    "Slow loop",
  ],
  [
    "https://cdn.myanimelist.net/images/anime/4/89877.jpg",
    "Yuru Camp △ Laid-Back Camp",
  ],
];

const acceptedTypes = ["jpg", "png", "gif", "CAU", "jpe"];
const inputTitle = document.getElementById("title");
const inputImgUrl = document.getElementById("image-url");
const btnAdd = document.getElementById("btn-add");
const imgContainer = document.querySelector(".imgs");

/*
 * Main
 **/

window.addEventListener("load", () => {
  animes.map(([imageURL, title], index) => {
    if (checkFieldsAndUrl(imageURL, title)){
      updateDOM(imageURL, title, index);
    }
  })
  btnAdd.addEventListener("click", () => {
    insertAnime(inputImgUrl.value, inputTitle.value);
  });
});

/**
 *  Functions
 **/

function checkFieldsAndUrl(newImageURL, newTitle) {
  if (!newImageURL || !newTitle) {
    alert("Título ou URL da imagem sem preenchimento");
    return false;
  }
  if (!acceptedTypes.includes(newImageURL.slice(-3))) {
    alert("Imagem inválida, tente novamente");
    return false;
  }
  return true;
}

function insertAnime(newImageURL, newTitle, id) {
  if (!checkFieldsAndUrl(newImageURL, newTitle)) {
    return false;
  } else {
    animes.push([newImageURL, newTitle]);
    updateDOM(newImageURL, newTitle, id);
    return true;
  }
}

function updateDOM(newImageURL, newTitle, id) {
  const divImage = document.createElement("div");
  const img = document.createElement("img");
  const divP = document.createElement("div");
  const p = document.createElement("p");
  const btnDel = document.createElement("button");

  divImage.classList.add(["img"]);
  divImage.setAttribute("id", "img" + id);

  img.setAttribute("src", newImageURL);
  img.setAttribute("alt", newTitle);

  divP.classList.add(["img-subtitle"]);
  p.innerHTML = newTitle;

  btnDel.setAttribute("id", "btn" + id);
  btnDel.innerHTML = "Excluir";
  btnDel.addEventListener("click", () => removeAnime(id));
  divImage.appendChild(img);
  divP.appendChild(p);
  divP.appendChild(btnDel);
  divImage.appendChild(divP);
  imgContainer.appendChild(divImage);
  return true;
}

function removeAnime(id) {
  try {
    imgContainer.innerHTML = "";
    delete animes[id];
    animes.map(([imageURL, title], index) => updateDOM(imageURL, title, index));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
