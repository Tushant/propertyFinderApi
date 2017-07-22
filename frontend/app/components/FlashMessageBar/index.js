import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'assets/css/animation.css';

const transitionOptions = {
  transitionName: 'notification-fade',
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500
};

const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = () => {
  return {}
};

class FlashMessageBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      timeout: this.props.timeout
    };
  }
  componentDidMount() {
    console.log('mounting');
    this.setState({
      message: this.props.message
    });

    setTimeout(() => {
      this.setState({
        message: null
      });
    }, this.props.timeout);
  }

  static defaultProps = {
    timeout: 5000
  };
  render() {
    const style = {
      message: {
        position: 'fixed',
        width: '100%',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        background: this.props.success ? 'rgba(126, 211, 3, 0.85)' : '#F16B6F',
        padding: '1.6rem 0',
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
        lineHeight: 2,
        overflow: 'hidden'
      }
    };
    return (
      <ReactCSSTransitionGroup {...transitionOptions}>
        {this.state.message
          ? <div style={style.message}>
            {this.state.message}
          </div>
          : null}
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessageBar);
