function addToCountryInfo(country) {
  return country.map(
    ({ name, flags, capital, population, languages }) =>
      `
    <div class="flag__container">
        <img
          class="flag__img"
          src="${flags.svg}"
          alt="this is flag those country"
          width=270
        />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-info__desc">
        <li class="country-info__item">
          Capital:
          <span>${capital}</span>
        </li>
        <li class="country-info__item">
          Population:
          <span>${population}</span
          >
        </li>
        <li class="country-info__item">
          Languages:
          <span>${Object.values(languages)}</span
          >
        </li>
      </ul>`
  );
}

function addToCountryList(country) {
  return country
    .map(
      ({ name, flags }) =>
        `<li class="country-list__item">
        <img
          class="country-list__flag"
          src="${flags.svg}"
          alt="this is flag those country"
          width=270
          />
        <h2 class="country-list__title">${name.official}</h2>
      </li>`
    )
    .join('');
}

export { addToCountryInfo, addToCountryList };
