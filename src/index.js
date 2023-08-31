import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_qzGt6DwSbX7USuLtfcHK2q9rBaX7QSV3O3DkXdDkGWwUaezd4VgnEzANqWvYbM6U';
// console.log(select.setData(createSelect(data)));
const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  picture: document.querySelector('.picture'),
  description: document.querySelector('.desc'),
};
console.log(refs.description);
console.log(refs.picture);

document.addEventListener('DOMContentLoaded', renderPage);
function renderPage() {
  refs.loader.style.display = 'block';
  fetchBreeds()
    .then(breeds => createSelect(breeds))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loader.style.display = 'none';
    });
}

function createSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#selectElement',
  });
}

refs.select.addEventListener('change', handlerChange);

function handlerChange(evt) {
  refs.loader.style.display = 'block';
  // refs.loader.classList.remove('hide')
  const breedId = evt.target.value;
  console.log('breedId', breedId);
  refs.picture.innerHTML = '';
  refs.description.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(breed => createCatPage(breed))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      // refs.loader.classList.add('hide');
      refs.loader.style.display = 'none';
    });
}

function createCatPage(arr) {
  const picture = `<img class="cat-picture" src="${arr[0].url}" alt="${arr[0].breeds[0].id}" width="550">`;
  const descript = `<h2 class="cat-title">${arr[0].breeds[0].name}</h2>
  <p class="cat-descript">${arr[0].breeds[0].description}</p>
  <p class="cat-temp"><b>Temperament: </b>${arr[0].breeds[0].temperament}</p>`;
  refs.picture.insertAdjacentHTML('beforeend', picture);
  refs.description.insertAdjacentHTML('beforeend', descript);
}
