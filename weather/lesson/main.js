const inputBlock = document.querySelector('.weather__input');
const cityName = document.querySelector('.weather__city');
const countryName = document.querySelector('.weather__country');
const visibility = document.querySelector('.weather__visibility > p');
const wind = document.querySelector('.weather__wind > p');
const cloud = document.querySelector('.weather__cloud > p');
const temperature = document.querySelector('.weather__temperature');
const shortDesc = document.querySelector('.weather__desc');
const time = document.querySelector('.weather__date');
inputBlock.onclick = function () {
  this.classList.add('active');
};

inputBlock.onblur = function () {
  this.classList.remove('active');
};

window.onload = function () {
  searchCountry('hanoi');
};

function searchCountry(search) {
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bb31f19c2dfa9b136adfb18424dd169d`;

  fetch(apiWeather)
    .then(response => response.json())
    .then(data => {
      cityName.innerText = data.name;
      countryName.innerText = data.sys.country;
      visibility.innerText = data.visibility + '(m)';
      wind.innerText = data.wind.speed + '(m/s)';
      cloud.innerText = data.main.humidity + '(%)';
      temperature.innerHTML = `${Math.round(
        data.main.temp - 273.15
      )} <sup>o</sup> C`;
      shortDesc.innerText = data.weather[0].main;
      time.innerText = new Date().toLocaleString('vi');
      if (Math.round(data.main.temp - 273.15) < 20) {
        document
          .querySelector('.weather')
          .setAttribute('class', 'weather cold');
        document.querySelector('body').setAttribute('class', 'coldbody');
      } else if (
        Math.round(data.main.temp - 273.15) < 30 &&
        Math.round(data.main.temp - 273.15) > 20
      ) {
        document
          .querySelector('.weather')
          .setAttribute('class', 'weather warm');
        document.querySelector('body').setAttribute('class', 'warmbody');
      } else {
        document.querySelector('.weather').setAttribute('class', 'weather hot');
        document.querySelector('body').setAttribute('class', 'hotbody');
      }
    });
}

inputBlock.onkeypress = function (e) {
  if (e.charCode === 13) {
    let search = inputBlock.value.trim();
    searchCountry(search);
    e.target.value = '';
  }
};
