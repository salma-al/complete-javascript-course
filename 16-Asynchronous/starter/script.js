'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// render country
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
           <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                     <h3 class="country__name">${data.name}</h3>
                     <h4 class="country__region">${data.region}</h4>
                     <p class="country__row"><span>👫</span>${(
                       +data.population / 1000000
                     ).toFixed(1)} people</p>
                     <p class="country__row"><span>🗣️</span>${
                       data.languages[0].name
                     }</p>
                     <p class="country__row"><span>💰</span>${
                       data.currencies[0].name
                     }</p>
                </div>
           </article>
           `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//render error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

///////////////////////////////////////

/*
let getCountryData = function (country) {
  // AJAX call for country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // calling render country function
    renderCountry(data);

    // get neighbour countries
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call for country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryData('uae');

//////////////////////*/

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     });
// };

// SAME AS ABOVE BUT USING ARROW FUNCTION

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0], '');
      return data[0].borders;
    })
    .then(neighbours => {
      neighbours.forEach(neighbour => {
        fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
          .then(response => response.json())
          .then(data => renderCountry(data, 'neighbour'));
      });
    })
    .catch(err => {
      console.log(`${err}`);
      renderError(`somthing went wrong, ${err.message}. Try again!`);
    });
};

btn.addEventListener('click', () => {
  getCountryData('uae');
});

// getCountryData('yeeeemen');
