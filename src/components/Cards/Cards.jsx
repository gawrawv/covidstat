/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';

const Cards = ({
  data: {
    confirmed,
    deaths,
    recovered,
    updated_at,
    active,
    critical,
    // new_deaths,
    // new_confirmed,
    // new_recovered,
  },
}) => {
  // console.log(deaths, confirmed, recovered);
  return (
    <div className={styles.container}>
      <Grid container justify="center">
        <Grid item color="primary" xs={12} md={2} className={cx(styles.card)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Confirmed
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed ?? 0} duration={2} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(updated_at).toDateString()}</Typography>
            <Typography variant="body2"> Total Number of active case of COVID-19</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={2} className={cx(styles.card)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recoverd <small>({((recovered / confirmed) * 100).toFixed(2)}%) </small>
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered ?? 0} duration={2} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(updated_at).toDateString()}</Typography>

            <Typography variant="body2"> Total Number of recovered from COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} md={2} className={cx(styles.card)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Critical
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={critical ?? 0} duration={2} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(updated_at).toDateString()}</Typography>

            <Typography variant="body2"> Total Number of Critical caused by COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} md={2} className={cx(styles.card)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths <small>({((deaths / confirmed) * 100).toFixed(2)}%) </small>
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths ?? 0} duration={2} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(updated_at).toDateString()}</Typography>

            <Typography variant="body2"> Total Number of death caused by COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item color="primary" xs={12} md={2} className={cx(styles.card)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={active ?? 0} duration={2} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(updated_at).toDateString()}</Typography>
            <Typography variant="body2"> Total Number of active case of COVID-19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
export default Cards;
