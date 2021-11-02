import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const WaitI18n = ({ children, loader: Loader }) => {
  const { ready } = useTranslation();

  if (!ready && process.browser) {
    return <Loader />;
  }

  return children;
};

WaitI18n.propTypes = {
  loader: PropTypes.func.isRequired,
};

WaitI18n.defaultProps = {
  loader: () => null,
};

export default WaitI18n;
