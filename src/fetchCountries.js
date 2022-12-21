export function fetchCountries() {

        console.log(`${searchQuery}`)
        return fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name.official,capital,population,flags.svg,languages`)
            .then(r => { r.json() })
            .then(country => { console.log(country) })
    }
