import './css/styles.css';

import Countries from './js/fetchCountries';
import { addToCountryInfo, addToCountryList } from './js/card-country';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  country_info: document.querySelector('.country-info'),
};
const { input, list, country_info } = refs;

const DEBOUNCE_DELAY = 300;
const MAX_COUNT = 10;

const newListCountries = new Countries();

input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
  newListCountries.searchCountry = evt.target.value.trim();

  if (!newListCountries.searchCountry) {
    return newListCountries.resetMarkup(list, country_info);
  }

  newListCountries.fetchCountries().then(showCountries).catch(errorFetch);
}

function showCountries(country) {
  if (country.length > MAX_COUNT) {
    newListCountries.resetMarkup(list, country_info);

    return Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        timeout: 1500,
      }
    );
  } else if (country.length === 1) {
    list.innerHTML = '';

    const markup = addToCountryInfo(country);
    country_info.innerHTML = markup;
  } else {
    country_info.innerHTML = '';

    const markup = addToCountryList(country);
    list.innerHTML = markup;
  }
}

function errorFetch() {
  newListCountries.resetMarkup(list, country_info);

  Notify.failure('Oops, there is no country with that name.', {
    timeout: 1500,
  });
}
