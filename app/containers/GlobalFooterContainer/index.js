import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { GlobalFooter } from 'components/GlobalFooter/';

import {
  makeSelectFooterLoading,
  makeSelectFooterError,
  makeSelectFooterData,
  makeSelectSiteLinkData,
  makeSelectSocialData,
} from './selectors';

import {
  loadFooter,
} from './actions';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectFooterLoading(),
  error: makeSelectFooterError(),
  footerData: makeSelectFooterData(),
  siteLinkData: makeSelectSiteLinkData(),
  socialData: makeSelectSocialData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInit: () => { dispatch(loadFooter()); },
    dispatch,
  };
}

const GlobalFooterContainer = injectIntl(connect(mapStateToProps, mapDispatchToProps)(GlobalFooter));

export default GlobalFooterContainer;
