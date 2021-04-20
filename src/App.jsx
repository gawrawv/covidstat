/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Charts, Cards, CountryPicker, Footer, ChartPicker } from './components';
import style from './App.module.css';
// eslint-disable-next-line import/named
import { fetchData } from './api';
import coronaImage from './images/covid-19.png';

const Loading = require('react-loading-animation');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { loading: true },
      country: '',
      chartType: 'DailyData',
    };
  }

  async componentDidMount() {
    const fetcheddata = await fetchData();
    this.setState({ data: fetcheddata });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: { loading: fetchedData?.loading, ...fetchedData }, country });
  };

  handleChartChange = (chart) => {
    this.setState((prevState) => ({ ...prevState, chartType: chart }));
  };

  render() {
    const { data, country, chartType } = this.state;
    if (data?.loading) {
      return (
        <main className={style.loading}>
          <h1 style={{ textAlign: 'center' }}>Fetching COVID-19 Data</h1>
          <Loading />
        </main>
      );
    }
    return (
      <main className={style.container}>
        <div className={style.image}>
          <img src={coronaImage} alt="COVID-19" />
        </div>
        <Cards data={data} />
        <div style={{ width: '100%' }}>
          <Grid
            container
            direction="row"
            style={{ flexGrow: '1' }}
            // justify="center"
            // alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <CountryPicker handleCountryChange={this.handleCountryChange} />
                </Grid>
                <Grid item>
                  <ChartPicker handleChartChange={this.handleChartChange} chartType={chartType} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Charts data={data} chartType={chartType} country={country} />
        <Footer />
      </main>
    );
  }
}

export default App;
