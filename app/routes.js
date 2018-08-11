// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import homeReducer from 'containers/HomePage/reducer';

import { getAsyncInjectors } from './utils/asyncInjectors';
import { routeLoaded } from './containers/App/actions';

import ActivityApp from './components/Activity';
import MyAccountApp from './components/MyAccount';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/CarouselContainer/reducer'),
          import('containers/Ad/reducer'),
          import('containers/HomePage'),
          import('containers/HomePage/sagas'),
          import('containers/CarouselContainer/sagas'),
          import('containers/GlobalFooterContainer/sagas'),
          import('containers/Ad/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([homeReducer, carouselReducer, adsReducer, component, ...sagas]) => {
          injectReducer('home', homeReducer.default);
          injectReducer('carousel', carouselReducer.default);
          injectReducer('ads', adsReducer.default);
          injectSagas(
            // Note: Albeit the weird syntax bellow, this solution is almost
            // twice as fast than the classic more readable solution:
            // `sagas.reduce((acc, x) => acc.concat(x.default), [])`
            // Because concatenation only happens once.
            // eslint-disable-next-line prefer-spread
            [].concat.apply([], sagas.map((x) => x.default))
          );
          // console.log('route', this.name);
          store.dispatch(routeLoaded(this.name));
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/mileageplus',
      name: 'myaccount',
      component: MyAccountApp,
      indexRoute: { getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MyAccount/MileagePlusProfile/reducer'),
          import('containers/MyAccount/MileagePlusProfile/sagas'),
          import('containers/MyAccount/MileagePlusProfile'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mileagePlus', reducer.default);
          injectReducer('home', homeReducer); // Remove: Added to make login link to work.
          injectSagas(sagas.default);
          store.dispatch(routeLoaded(this.name));
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      },
      childRoutes: [
        { path: '/activity',
          name: 'activity',
          component: ActivityApp,
          indexRoute: { getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/MyAccount/Activity/reducer'),
              import('containers/MyAccount/Activity/sagas'),
              import('containers/MyAccount/Activity'),
            ]);
            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('activity', reducer.default);
              injectReducer('home', homeReducer);
              injectSagas(sagas.default);
              store.dispatch(routeLoaded(this.name));
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          },
        }],
    },
  ];
}
