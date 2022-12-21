import './css/styles.css';
import { fetchCountries } from './fetchCountries'


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')


inputEl.addEventListener("input", onSearch)

function onSearch(e){
    e.preventDefault();

    searchQuery = e.target.value
    
    fetchCountries()
    // createCountryList()
}

function createCountryList(countries) {
    const markupCountriesList = countries.map(({ name, flags }) =>
        `<li class="country"><img src="${flags.svg}"      
        alt="Flag of ${name.official}" />      <h1>${name.official}</h1></li>`)
        .join('');
}