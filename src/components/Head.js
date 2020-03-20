import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Head = ({ siteName, title, description, robots, children }) => {
  return (
    <>
      <Helmet titleTemplate={`%s | ${siteName}`}>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {(robots === false && (
          <meta name="robots" content="noindex, nofollow" />
        )) ||
          ``}
        {children}
      </Helmet>
    </>
  );
};

Head.defaultProps = {
  siteName: 'Create React App',
};

Head.propTypes = {
  siteName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  robots: PropTypes.bool,
  canonical: PropTypes.string,
};

export default Head;
