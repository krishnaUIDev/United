/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import GlobalHeaderContainer from 'containers/GlobalHeaderContainer';
import GlobalFooterContainer from 'containers/GlobalFooterContainer';
import withProgressBar from 'components/ProgressBar';
import TimeoutModal from 'containers/TimeoutModal';
import Advisories from 'containers/Advisories';
// Reset stylesheets
import 'normalize.css/normalize.css';
import 'sanitize.css/sanitize.css';
import 'styles/styles.scss';
import config from 'config'; // eslint-disable-line

export function App(props) {
  return (
    <div className="page">
      <Helmet>
        <script src={config.ENSIGHTEN_BOOTSTRAP}></script>
      </Helmet>
      <Advisories />
      <a href="#travelTab" className="visuallyHidden">Skip to main content</a>
      <header role="banner">
        <GlobalHeaderContainer />
      </header>
      <TimeoutModal />
      {React.Children.toArray(props.children)}
      <footer role="contentinfo">
        <GlobalFooterContainer />
      </footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default withProgressBar(App);
