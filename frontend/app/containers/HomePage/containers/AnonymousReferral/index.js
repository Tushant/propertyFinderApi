import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import Dropzone from 'react-dropzone';
import {
  makeSelectAnonymousAgentInfo,
  makeSelectAnonymousAgentSuccessResponse,
  makeSelectAnonymousAgentErrorResponse
} from './selectors';
import TextFieldGroup from 'utils/textFieldGroup';
import { isEmpty } from 'utils/helper';
import { anonymousAgentApplication, loadAnonymousAgentData } from './actions';
import { MessageBar } from 'components/MessageBar';
import Card from 'components/Card';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import Logo from 'assets/img/logo.svg';

const mapDispatchToProps = dispatch => ({
  anonymousAgent: anonymous_agent => dispatch(anonymousAgentApplication(anonymous_agent)),
  loadAnonymousAgentData: referId => dispatch(loadAnonymousAgentData(referId))
});

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectAnonymousAgentSuccessResponse(),
  errorResponse: makeSelectAnonymousAgentErrorResponse(),
  anonymousInfo: makeSelectAnonymousAgentInfo()
});

class AnonymousReferral extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        agree_terms_condition: false,
        email_offer_subscription: false,
        refer_code: `${props.match.params.referralid}`,
        mobile_number: '',
        country_code: '',
        imp_terms_conditions: false,
        document_name: ''
      },
      isReffered: false,
      errors: {},
      show_password: false
    };
  }
  componentDidMount() {
    this.props.loadAnonymousAgentData(this.props.match.params.referralid);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.anonymousInfo !== this.props.anonymousInfo) {
      this.setState(state => ({
        user: {
          ...state.user,
          first_name: nextProps.anonymousInfo.first_name,
          last_name: nextProps.anonymousInfo.last_name,
          email: nextProps.anonymousInfo.email
        }
      }));
    }
  }
  handlePasswordChecked = () => this.setState({ show_password: !this.state.show_password });

  handleTermsChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        agree_terms_condition: !this.state.user.agree_terms_condition
      }
    });
  };
  handleAgentTermsChecked = () =>
    this.setState({
      user: {
        ...this.state.user,
        imp_terms_conditions: !this.state.user.imp_terms_conditions
      }
    });

  handleSubscribtionChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        email_offer_subscription: !this.state.user.email_offer_subscription
      }
    });
  };

  handlePhoneChange(value) {
    this.setState(state => ({
      user: { ...state.user, mobile_number: value }
    }));
  }

  handleChange = e => {
    const fieldName = e.target.name;
    const label = e.target.placeholder;
    this.setState(
      {
        user: { ...this.state.user, [e.target.name]: e.target.value }
      },
      () => {
        this.validateField([{ label, fieldName }]);
      }
    );
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;
    validate.forEach(field => {
      const name = field.fieldName;
      if (this.state.user[name].length === 0) {
        hasError = true;
        const label = field.label;
        errors[name] = `${label} can't be empty`;
      } else {
        errors[name] = '';
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleBlur = event => {
    const fieldName = event.target.name;
    const label = event.target.placeholder;
    this.validateField([{ label, fieldName }]);
  };

  onDrop = files => {
    this.setState({
      user: { ...this.state.user, document_name: files }
    });
  };

  handleRemove = file => {
    const newState = this.state.user.document_name;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      this.setState({ user: { ...this.state.user, document_name: newState } });
    }
  };

  showFiles() {
    const { document_name } = this.state.user;
    return (
      <div>
        <ul className="dropped">
          {document_name.map((file, idx) =>
            <li className="alert alert-success flex-col" key={idx}>
              <span className="fileName">
                {file.name}
              </span>
              <button className="btn btn-link" onClick={e => this.handleRemove(file)}>
                <i className="icon-trash" />
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }

  handleSubmit = e => {
    const { user } = this.state;
    e.preventDefault();
    const localNumber = formatPhoneNumber(parsePhoneNumber(user.mobile_number), 'National');
    const internationalNumber = formatPhoneNumber(
      parsePhoneNumber(user.mobile_number),
      'International'
    );
    const splittedNumber = localNumber && localNumber.split(/[ -]+/);
    const countryCodePos = internationalNumber && internationalNumber.indexOf(splittedNumber[0]);
    let countryCode;
    if (internationalNumber[countryCodePos - 1] === ' ') {
      countryCode = internationalNumber.substring(0, countryCodePos - 1);
    } else {
      countryCode = internationalNumber.substring(0, countryCodePos);
    }
    this.setState(
      state => ({
        user: {
          ...state.user,
          country_code: countryCode,
          mobile_number: localNumber
        }
      }),
      () => {
        this.props.anonymousAgent(this.state.user);
      }
    );
  };

  render() {
    const { show_password, user, errors } = this.state;
    const { successResponse, errorResponse } = this.props;
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <MessageBar message={successResponse} timeout={5000} />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <MessageBar message={errorResponse} timeout={5000} />;
    }
    return (
      <div className="ptn-1 pd-all-md">
        {message && message}
        <div className="card card-md card-center">
          <h1>Apply for IMP</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="field form-block">
              <input
                type="text"
                name="first_name"
                value={user && user.first_name}
                placeholder="First Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <span className="text-danger">
                {errors && errors.first_name}
              </span>
            </div>
            <div className="field form-block">
              <input
                type="text"
                name="last_name"
                value={user && user.last_name}
                placeholder="Last Name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <span className="text-danger">
                {errors && errors.last_name}
              </span>
            </div>
            <div className="field form-block">
              <input
                type="email"
                name="email"
                value={user && user.email}
                placeholder="Email"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <span className="text-danger">
                {errors && errors.email}
              </span>
            </div>
            <div className="field form-block">
              <input
                type={show_password ? 'text' : 'password'}
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <span className="text-danger">
                {errors && errors.password}
              </span>
            </div>
            <div className="field">
              <label className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  required="required"
                  onChange={this.handleTermsChecked}
                  checked={user.agree_terms_condition}
                />
                <span className="custom-control-indicator" />{' '}
                <span className="custom-control-description">
                  I agree the terms and conditions.
                </span>
                <a href="#" target="_blank">
                  Read
                </a>
              </label>
            </div>
            <div className="field">
              <label className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  onChange={this.handleSubscribtionChecked}
                  checked={user.email_offer_subscription}
                />
                <span className="custom-control-indicator" />{' '}
                <span className="custom-control-description">Subscribe newsletter</span>{' '}
              </label>
            </div>
            <div className="field">
              <label>Referal Code</label>
              <input
                type="text"
                name="refer_code"
                value={user.refer_code}
                placeholder="Refer Code"
                readOnly
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </div>
            <span className="text-danger">
              {errors && errors.refer_code}
            </span>
            <br />
            <div className="phone-container field">
              <Phone
                placeholder="Start typing a phone number"
                className="phone"
                value={user.mobile_number}
                onChange={(event, value) => this.handlePhoneChange(event, value)}
              />

              {user.mobile_number
                ? isValidPhoneNumber(user.mobile_number)
                  ? <i className="icon-check-circle" />
                  : <i className="icon-close-circle" />
                : null}
            </div>
            <div className="field">
              <label className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  required
                  onChange={this.handleAgentTermsChecked}
                  checked={user.imp_terms_conditions}
                />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">
                  {' '}I agree terms and conditions for IMP
                </span>{' '}
                <a href="#" target="_blank">
                  Learn
                </a>
              </label>
            </div>
            <Dropzone
              className="dropzone"
              onDrop={this.onDrop}
              multiple
              accept=".pdf, .doc*, .json"
            >
              Drop document here or <br />
              <button className="btn btn-link">Upload</button>{' '}
            </Dropzone>
            {errors.document_name &&
              <p className="help-block alert alert-danger">
                {errors.document_name}
              </p>}
            <li>
              {!isEmpty(user.document_name) && this.showFiles()}{' '}
            </li>
            <button
              id="btnSubmit"
              className="primary button"
              type="submit"
              disabled={!isValidPhoneNumber(user.mobile_number) || !user.password}
            >
              Submit Details
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnonymousReferral);
