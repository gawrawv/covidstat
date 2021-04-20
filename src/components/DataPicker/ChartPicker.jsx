/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Select, FormControl, Paper } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import styles from './DataPicker.module.css';
// eslint-disable-next-line import/named
import { fetchCountries } from '../../api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: 50,
    minWidth: 220,
  },
}));
const ChartPicker = ({ handleChartChange, chartType }) => {
  const classes = useStyles();
  //   const [chartType, setChartType] = useState('');

  //   useEffect(() => {
  //     const fetchAPI = async () => {
  //       setFetchedCountries(await fetchCountries());
  //       // console.log(`country List: ${fetchedCountries}`);
  //     };
  //     fetchAPI();
  //   }, [setChartType]);

  return (
    <FormControl className={classes.formControl}>
      <Select
        native
        label="Chart"
        inputProps={{
          name: 'chart',
          id: '',
        }}
        onChange={(e) => handleChartChange(e.target.value)}
      >
        <option value="DailyData" selected={chartType === 'DailyData'}>
          Daily Data
        </option>
        <option value="MonthlyData" selected={chartType === 'MonthlyData'}>
          Monthly Data
        </option>
      </Select>
    </FormControl>
  );
};
export default ChartPicker;
