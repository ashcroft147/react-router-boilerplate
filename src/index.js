import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from  'react-router'
// Router : top level object, watch the url whenever the url gets updated
// Route: Router tells it's child routes to rerender with different components
// browserhistory: it holds the history of routing info.

import requireAuth from './components/require_authentication';
import App from './components/app';
import Resources from './components/resources';
import reducers from './reducers';
import Perf from 'react-addons-perf';

const createStoreWithMiddleware = applyMiddleware()(createStore);

Perf.start();
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
          <Route path='resources' component= { requireAuth(Resources) } >
          </Route>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));


Perf.stop();

const measurements = Perf.getLastMeasurements();

Perf.printInclusive(measurements);
Perf.getExclusive(measurements);

