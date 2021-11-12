import { BASE_URL } from "../constants/urls";

export const fetchAllCountries = () => {
  let today: Date | string = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dd = String(yesterday.getDate()).padStart(2, "0");
  let mm = String(yesterday.getMonth() + 1).padStart(2, "0");
  let yyyy = yesterday.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return fetch(
    `${BASE_URL}/countries_summary?min_date=${today}T00:00:00.000Z&hide_fields=uids,country_iso2s,country_iso3s,country_codes,combined_names`
  ).then((resp) => resp.json());
};

export const fetchCurrentCountryData = (countryName: string) => {
  return fetch(
    `${BASE_URL}/countries_summary?country=${countryName}&hide_fields=uids,country_iso2s,country_iso3s,country_codes,combined_names`
  ).then((resp) => resp.json());
};

export const fetchCurrentCountryInfo = (country: string) => {
  let today: Date | string = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dd = String(yesterday.getDate()).padStart(2, "0");
  let mm = String(yesterday.getMonth() + 1).padStart(2, "0");
  let yyyy = yesterday.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return fetch(
    `${BASE_URL}/countries_summary?country=${country}&min_date=${today}T00:00:00.000Z&hide_fields=uids,country_iso2s,country_iso3s,country_codes,combined_names`
  ).then((resp) => resp.json());
};

// fetch(`${BASE_URL}/global?country_iso3=USA&min_date=2021-10-30T00:00:00.000Z&max_date=2021-11-02T00:00:00.000Z`) // for one country every days since 22.01.21
// // min_date ic max_date exac orery
// .then(resp => resp.json())
// .then(data => console.log((data), 'global?country_iso3=USA'))

// fetch(`${BASE_URL}/countries_summary?min_date=2021-11-03T00:00:00.000Z`) // countries summaries for yesterday
// .then(resp => resp.json())
// .then(data => console.log(data, 'all countries_summary'))

// fetch(`${BASE_URL}/global?country_iso3=FRA&min_date=2021-10-30T00:00:00.000Z`) // countrie summaries for yesterday
// .then(resp => resp.json())
// .then(data => console.log(data, 'France data since some date.'))

// fetch(`${BASE_URL}/countries_summary?country=France&max_date=2021-11-03T00:00:00.000Z`) // countrie summaries since covid start
// .then(resp => resp.json())
// .then(data => console.log(data, 'France summary for yesterday')) &hide_fields=uids,country_iso2s,country_iso3s,country_codes,combined_names
