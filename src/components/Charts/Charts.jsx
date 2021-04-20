/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Paper } from '@material-ui/core';
// eslint-disable-next-line import/named
import { fetchDailyData, fetchGlobalMonthlyData } from '../../api';
import styles from './Charts.module.css';

const Charts = ({ country, chartType }) => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthNames] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  const [selectedChartType, setSelectedChartType] = useState('');

  const fetchAPI = async () => {
    setDailyData(await fetchDailyData(country));
    setMonthlyData(await fetchGlobalMonthlyData(country));
    setSelectedChartType(chartType);
    // console.table(monthlyData);
  };
  useEffect(() => {
    fetchAPI();
  }, [country, chartType]);
  const MonthluChart = monthlyData.length ? (
    <Line
      data={{
        labels: monthlyData.map(({ key }) => monthNames[key]),
        datasets: [
          {
            data: monthlyData.map(({ value: { active } }) => active),
            label: 'Active',
            borderColor: 'rgba(0,0,255,0.5)',
            backgroundColor: 'rgba(0,0,255,0.5)',
            fill: true,
          },
          {
            data: monthlyData.map(({ value: { recovered } }) => recovered),
            label: 'Recovered',
            borderColor: 'rgba(0,187,0,0.5)',
            backgroundColor: 'rgba(0,255,0,0.5)',
            fill: true,
          },
          {
            data: monthlyData.map(({ value: { deaths } }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      }}
    />
  ) : (
    ''
  );
  const dailyChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ active }) => active),
            label: 'Active',
            borderColor: 'rgba(0,0,255,0.5)',
            backgroundColor: 'rgba(0,0,255,0.5)',
            fill: true,
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: 'Recovered',
            borderColor: 'rgba(0,187,0,0.5)',
            backgroundColor: 'rgba(0,255,0,0.5)',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <Paper
        style={{
          width: '100vw',
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          boxShadow:
            '6px 6px 14px 0 rgba(0, 0, 0, 0.253) , -8px -8px 18px 0 rgba(255, 255, 255, 0.76) ',
        }}
      >
        <div style={{ marginTop: '20px' }}>
          <h1 style={{ textAlign: 'center' }}>{selectedChartType}</h1>

          {selectedChartType === 'DailyData' ? dailyChart : MonthluChart}
        </div>{' '}
      </Paper>
    </div>
  );
};
export default Charts;
