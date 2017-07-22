/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import radar from 'assets/img/radar.jpg';
import messages from './messages';

const NotFound = (props) => {
  return (
    <div className="pd-all-lg align-center">
      <img
        className="mg-btm-md"
        src={radar}
        alt="radar"
        style={{ height: '303px' }}
      />
      <h1 className="thin" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <FormattedMessage {...messages.header} />
      </h1>

      <Link className="btn btn-link" to="/">
        Go to Home Page
      </Link>
      <div className="sticky-btm-right">
        <span className="text-xlg bold dim-1">404</span>
      </div>
    </div>
  );
}

export default NotFound;
