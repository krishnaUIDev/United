import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import messages from './messages';

import {
  LOCATION_CAROUSEL,
} from './constants';

import layouts from './layouts';

import {
  makeSelectAdData,
  makeSelectAdError,
  makeSelectAdLoaded,
  makeSelectAdLoading,
} from './selectors';

import { loadAds } from './actions';

/**
 * This connected component will render the Ads on the page depending on the provided location.
 * The ads will only be loaded when the ad is mounted and only if it has not been loaded before.
 *
 * Usage:
 * ```javascript
 * import { LOCATION_CAROUSEL } from 'containers/Ad/constants';
 * import Ad from 'containers/Ad';
 * // ...
 * <Ad location={LOCATION_CAROUSEL} />
 * ```
*/
class Ad extends React.Component {
  componentWillMount() {
    // Load the ads only once
    if (!this.props.loaded && !this.props.loading) {
      this.props.onInit();
    }
  }

  renderLayouts(location, ...values) {
    // values => text, image, url, external
    // Each Ad will have a different layout depending on its location and (maybe) type.
    //   Define new layouts inside layouts.js to keep this file's size small.
    switch (location) {
      case LOCATION_CAROUSEL: {
        return layouts.centralBlock(...values);
      }
      default: {
        return layouts.centralBlock(...values);
      }
    }
  }

  render() {
    const { intl, location, data, loading, loaded, error } = this.props;
    if (!loaded || loading || error) return null;

    const locationData = data.find((x) => x.location === location);
    // values => text, image, url, external
    const content = this.renderLayouts(
      location,
      locationData.name,
      locationData.images[0].url, // It seems like the service will always return a single image
      locationData.linkUrl,
      locationData.isExternalLink,
      intl.formatMessage(messages.ariaLink, { linkText: locationData.linkText }),
    );

    return content;
  }
}

Ad.propTypes = {
  location: PropTypes.string,
  intl: intlShape.isRequired,
  data: PropTypes.any,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.any,
  onInit: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  data: makeSelectAdData(),
  loading: makeSelectAdLoading(),
  loaded: makeSelectAdLoaded(),
  error: makeSelectAdError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInit: () => { dispatch(loadAds()); },
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Ad));
