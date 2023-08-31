import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_qzGt6DwSbX7USuLtfcHK2q9rBaX7QSV3O3DkXdDkGWwUaezd4VgnEzANqWvYbM6U';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  const SEARCH = '/images/search';
//   console.log(fetch(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`));
//   return fetch(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
    return axios.get(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`)
        .then(resp => resp.data)
        .catch(err => err(err));
}

export { fetchBreeds, fetchCatByBreed };
