import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from "./app";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/plugins/bootstrap/css/bootstrap.min.css';
//CSS & Bootstrap
import './assets/css/style.css';

import './assets/plugins/bootstrap/js/bootstrap.bundle.min.js';
import './assets/plugins/select2/css/select2.min.css';

//Font Awesome
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './assets/plugins/fontawesome/css/all.min.css';
import './assets/plugins/fontawesome/css/fontawesome.min.css';
// CSS Baseline
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { NotificationProvider } from './contexts/NotificationContext.js';
import './index.css';
import store from './redux/store.js';
import router from './routes/routes.js';
import { theme } from './theme/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
        <ThemeProvider theme={theme}>
          <NotificationProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </NotificationProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );
