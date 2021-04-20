/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { Offline, Online } from 'react-detect-offline';
import { Alert, AlertTitle } from '@material-ui/lab';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Online>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Online>
    <Offline>
      <Alert severity="error">
        <AlertTitle> No Internet </AlertTitle> Sorry! There is no{' '}
        <strong>internet Connection</strong>
      </Alert>
    </Offline>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
