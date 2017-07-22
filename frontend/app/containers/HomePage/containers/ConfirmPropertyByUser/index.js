import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import {
  makeSelectMyInfo,
  makeSelectMyInfoSuccessResponse,
  makeSelectMyInfoErrorResponse
} from './selectors';
import { getMyInfo, updateMyInfo } from './actions';
import Link from 'react-router-dom/Link';
import { MessageBar } from 'components/MessageBar';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';

const mapStateToProps = createStructuredSelector({
  myInfo: makeSelectMyInfo(),
  errorResponse: makeSelectMyInfoErrorResponse(),
  successResponse: makeSelectMyInfoSuccessResponse()
});

const mapDispatchToPropes = dispatch => ({
  loadMyInfo: id => dispatch(getMyInfo(id)),
  updateMyInfo: (myInfo, token) => dispatch(updateMyInfo(myInfo, token))
});

class ConfirmPropertyByUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user_info: {
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        country_code: '',
        password: '',
        agree_terms_condition: false,
        email_offer_subscription: false
      }
    };
  }
  componentDidMount() {
    this.props.loadMyInfo(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myInfo !== this.props.myInfo) {
      const mobile_num = `${nextProps.myInfo.country_code}${nextProps.myInfo.mobile_number}`;
      this.setState(state => ({
        user_info: {
          ...state.user_info,
          first_name: nextProps.myInfo.contact_fname,
          last_name: nextProps.myInfo.contact_lname,
          email: nextProps.myInfo.contact_email,
          mobile_number: mobile_num,
          country_code: nextProps.myInfo.country_code
        }
      }));
    }
  }

  handleChange = e => {
    this.setState({
      user_info: { ...this.state.user_info, [e.target.name]: e.target.value }
    });
  };

  handlePhoneChange(value) {
    this.setState(state => ({
      user_info: { ...state.user_info, mobile_number: value }
    }));
  }

  handleSubscribe = e =>
    this.setState({
      user_info: {
        ...this.state.user_info,
        email_offer_subscription: e.target.checked
      }
    });
  handleUserTerms = e =>
    this.setState({
      user_info: {
        ...this.state.user_info,
        agree_terms_condition: e.target.checked
      }
    });

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateMyInfo(this.state.user_info, this.props.match.params.id);
  };

  render() {
    const { errorResponse, successResponse } = this.props;
    const { user_info } = this.state;
    let message;
    if (errorResponse && typeof errorResponse === 'string') {
      message = <MessageBar message={errorResponse} timeout={4000} success />;
    }
    if (successResponse && typeof successResponse === 'string') {
      message = <MessageBar message={successResponse} timeout={4000} error />;
    }
    return (
      <div className="container">
        {message && message}
        <div className="card card-lg">
          <h1>Register</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Your Info</legend>
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={user_info && user_info.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={user_info && user_info.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Mobile No. with country code</label>
                <Phone
                  placeholder="Start typing a phone number"
                  value={user_info && user_info.mobile_number}
                  className="phone"
                  onChange={(event, value) => this.handlePhoneChange(event, value)}
                />
                {isValidPhoneNumber(user_info.mobile_number)
                  ? <span className="icon-check-circle" />
                  : <span className="icon-cancel-circle" />}
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={user_info && user_info.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" name="password" onChange={this.handleChange} />
              </div>
              <div className="field">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleSubscribe}
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">Subscribe Email</span>
                </label>
              </div>
              <div className="field">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleUserTerms}
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">
                    I agree terms and conditions. <Link to="/terms-and-conditions">Read Terms</Link>
                  </span>
                </label>
              </div>
              <button
                className="btn btn-default btn-block btn-lg"
                disabled={
                  !user_info.password ||
                  !user_info.agree_terms_condition ||
                  !isValidPhoneNumber(user_info.mobile_number)
                }
              >
                Submit Details
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToPropes)(ConfirmPropertyByUser);
