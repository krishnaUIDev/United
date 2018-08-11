/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { Iterable, fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import createMigration from 'redux-persist-migrate';
import localForage from 'localforage';
import { createLogger } from 'redux-logger';

import createReducer from './reducers';


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(/* istanbul ignore next */ initialState = {}, history) {
  // manifest controls the migration of persistent data
  const manifest = {
    1: (state) => state,
    // 2: (state) => Object.assign({}, { storage: state.storage }), // this line will remove old stored state
  };

  // reducerKey is the key of the reducer you want to store the state version in
  // in this example after migrations run `state.app.version` will equal `2`
  const reducerKey = 'storage';
  const migration = createMigration(manifest, reducerKey);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const stateTransformer = (state) => {
      if (Iterable.isIterable(state)) return state.toJS();
      return state;
    };

    const logger = createLogger({ // eslint-disable-line
      stateTransformer,
    });
    // uncomment next line to debug in IE
    // middlewares.push(logger);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    migration,
    autoRehydrate(),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  /* istanbul ignore next */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // begin periodically persisting the store
  persistStore(store, { storage: localForage, whitelist: ['global', 'storage'], blacklist: 'route' }, () => {
    // console.log('rehydrate end:');
  });

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
