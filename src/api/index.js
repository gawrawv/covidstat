/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';
import * as d3 from 'd3';

// const url = 'https://covid19.mathdro.id/api';
const url2 = 'https://corona-api.com/';
let ChangeableURL = url2;

export const fetchGlobalMonthlyData = async (country = '') => {
  ChangeableURL = country ? `${url2}/countries/${country}` : `${url2}/timeline`;
  try {
    const {
      data: { data },
    } = await axios.get(ChangeableURL);
    const covidData = country ? data.timeline : data;
    console.log(`timeline data ${country}`, country ? data.timeline : data);
    const groupedByDate = d3
      .nest()
      .key((d) => {
        return new Date(d.updated_at).getMonth();
      })
      .rollup((value) => ({
        confirmed: d3.sum(value, (d) => d.confirmed),
        deaths: d3.sum(value, (d) => d.deaths),
        active: d3.sum(value, (d) => d.active),
        recovered: d3.sum(value, (d) => d.recovered),
      }))
      .entries(covidData);
    console.log('group by date', groupedByDate);

    return groupedByDate;
  } catch (error) {
    console.log(error);
  }
};
// fetch data
const fetchGlobalCriticalData = async () => {
  const {
    data: { data },
  } = await axios.get(`${url2}/countries`);
  const critical_arr_data = data.map((item) => item.latest_data.critical);
  const total = critical_arr_data.reduce((acc, value) => acc + value);
  return total;
  // console.log(criticalData);
};

export const fetchData = async (country = '') => {
  ChangeableURL = country ? `${url2}/countries/${country}` : `${url2}/timeline`;
  try {
    const {
      data: { data },
    } = await axios.get(ChangeableURL);
    console.log(`critical data ${country}: ${data?.latest_data?.critical}`);
    const covidData = country ? data.latest_data : data[0];
    const critical = country ? covidData.critical : await fetchGlobalCriticalData();
    const updated_at = country ? data.updated_at : data[0].updated_at;
    const calculated = country ? covidData.calculated : 0;
    const active = covidData.confirmed - covidData.recovered - covidData.deaths;
    return {
      confirmed: covidData.confirmed,
      recovered: covidData.recovered,
      deaths: covidData.deaths,
      active,
      critical,
      calculated,
      updated_at,
    };
  } catch (error) {
    console.log(error);
  }
};

// fetch daily data

export const fetchDailyData = async (country) => {
  ChangeableURL = country ? `${url2}/countries/${country}` : `${url2}/timeline`;
  try {
    const {
      data: { data },
    } = await axios.get(ChangeableURL);
    const covidData = country ? data.timeline : data;
    const modifiedData = covidData.map((dailyData) => ({
      recovered: dailyData.recovered,
      active: dailyData.active,
      deaths: dailyData.deaths,
      date: dailyData.date,
      loading: false,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchDailyData = async (country) => {
//   const data = country ? fetchCountryBasedDailyData(country) : fetchGlobalDailyData();
//   return data;
// };

// fetch coutries
export const fetchCountries = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url2}/countries`);

    const availabel_data = data.filter((country) => country.latest_data.confirmed > 0);
    // console.log('check avaiable data', availabel_data);
    return availabel_data.map((country) => ({ name: country.name, code: country.code }));
  } catch (error) {
    console.error(error);
  }
};
