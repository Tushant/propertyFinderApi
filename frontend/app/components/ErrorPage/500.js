import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import withRouter from 'react-router-dom/withRouter';
import sad from 'assets/img/error.jpg';

class ServerError extends React.PureComponent {
  render() {
    return (
      <div className="pd-all-lg align-center">
        <img className="mg-btm-md" src={sad} alt="sad" />
        <h1 className="thin" style={{ maxWidth: '450px', margin: '0 auto' }}>
          Sorry<br />
          We have technical error
        </h1>
        <button className="btn btn-link" onClick={() => this.props.dispatch(push('/'))}>
          Try Again
        </button>
        <div className="sticky-btm-right">
          <span className="text-xlg bold dim-1">500</span>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withRouter(ServerError));
