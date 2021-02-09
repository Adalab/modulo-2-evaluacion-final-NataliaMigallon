"use strict";

const seriesContainer = document.querySelector(".js-series-container");
const inputElement = document.querySelector(".js-input");
const formElement = document.querySelector(".js-form");
const buttonElement = document.querySelector(".js-button");
const ulFavorites = document.querySelector(".js-favorites");

let series = [];
let favorites = [];

// API

function getDataFromApi() {
  const inputValue = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      series = [];
      for (const serie of data) {
        let title = serie.show.name;
        let img = serie.show.image;
        let id = serie.show.id;
        series.push({
          id: id,
          img: img,
          title: title,
        });
      }
      renderSeries();
      renderFavorites();
      listenSerieEvents();
    });
}
buttonElement.addEventListener("click", getDataFromApi);

// RENDER
function renderSeries() {
  let htmlCode = "";
  for (const serie of series) {
    htmlCode += `<li class="item1" data-myid=${serie.id}>`;
    if (serie.img === null) {
      htmlCode +=
        '<img class="item2" src="https://via.placeholder.com/210x295/ffffff/666666/?"/>';
    } else {
      htmlCode += `<img class="item2" src="${serie.img.medium}"/>`;
    }
    htmlCode += `<p>${serie.title}</p>`;
    htmlCode += "</li>";
  }
  seriesContainer.innerHTML = htmlCode;
  listenSerieEvents();
}

/* // LISTEN SERIES EVENTS
function listenSerieEvents() {
  const serieFavElements = document.querySelectorAll(".js-favorites"); //OJO AQUI
  for (const serieFavElement of serieFavElements) {
    serieFavElement.addEventListener("click", handleSerie);
  }
}
 */
function listenSerieEvents() {
  const elements = document.querySelectorAll(".item1");
  for (const element of elements) {
    element.addEventListener("click", handleSerie);
  }
}

/* function listenSerieEvents(ev) {
  const itemClick = ev.currentTarget.id;
  itemClick.addEventListener("click", handleSerie);
  console.log(itemClick);
} */

function handleSerie(ev) {
  /* const clickedSerieId = ev.currentTarget.id; */
  const clickedSerieId = parseInt(ev.currentTarget.id); //NUEVOOOO
  /* const clickedSerieId = parseInt(ev.currentTarget.myid); */
  const favoritesFoundIndex = series.find(function () {
    return series.id === clickedSerieId;
  });
  const serieFound = favorites.findIndex(function () {
    return series.id === clickedSerieId;
  });
  if (serieFound === -1) {
    favorites.push(favoritesFoundIndex);
  } else {
    favorites.splice(serieFound, 1);
  }
  renderFavorites();
  renderSeries();
}

// RENDER FAVORITES
function renderFavorites() {
  /*   let isFavoriteSerie;
   */ let htmlFav = "";
  /* htmlFav += ulFavorites; */
  /*   let lcfav = getLocalStorage(); */
  for (const serie of favorites) {
    htmlFav += `<li class="js-favorites" id="${serie.id}">`;
    htmlFav += `<img class="item2" src="${serie.img.medium}"/>`;
    htmlFav += `<p>${serie.title}</p>`;
    /*       htmlFav += lcfav[index]; */
    htmlFav += "</li>";
  }
  ulFavorites.innerHTML = htmlFav;
  listenSerieEvents();
}

/* function renderFavorites() {
  let htmlFav = "";
  let lcfav = getLocalStorage();
  for (let index = 0; index < fav.length; index++) {
    htmlFav += '<li class="js-favorite">';
    htmlFav += lcfav[index];
    html += "</li>";
  }
  htmlFav.innerHTML = htmlFav;
  listenSerieEvents();
} */

// PREVENT DEFAULT
function handleForm(ev) {
  ev.preventDefault();
}
formElement.addEventListener("submit", handleForm);

// FAVORITES
function isFavoriteSerie(serie) {
  // compruebo si la paleta que recibo por parámetro está en los favoritos
  const favoriteFound = favorites.find((favorite) => {
    // la dificultad de esta función interna del find es saber que tengo que comparar
    // yo consolearía console.log(favorite, palette) para ver los datos que debo comparar
    return favorites.id === serie.id;
  });
  // find devuelve undefined si no lo encuentra
  // retorno si está o no está en favoritos
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}
