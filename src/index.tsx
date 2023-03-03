import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <Helmet defaultTitle="TempleReactJs" titleTemplate="ReactJs.com - %s">
      <meta property="og:type" />
      <meta name="description" />
      <link rel="icon" type="image/png" sizes="16x16" />
    </Helmet>
  </Provider>,
);
