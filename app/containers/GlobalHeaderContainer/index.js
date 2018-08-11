import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { GlobalHeader } from 'components/GlobalHeader/';

import {
  makeSelectFooterLoading,
  makeSelectFooterError,
} from 'containers/GlobalFooterContainer/selectors';

import { loadFooter } from 'containers/GlobalFooterContainer/actions';

import { makeSelectHeaderData } from './selectors';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectFooterLoading(),
  error: makeSelectFooterError(),
  headerData: makeSelectHeaderData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInit: () => { dispatch(loadFooter()); },
    dispatch,
  };
}

const GlobalHeaderContainer = injectIntl(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader));

export default GlobalHeaderContainer;
