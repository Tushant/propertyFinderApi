import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocation, selectInitialize } from 'containers/App/selectors';
import { showDialog } from 'containers/App/actions';

import Footer from 'components/Footer';
import 'assets/css/semantic.css';
import 'assets/css/app.css';
import 'assets/css/animation.css';

const mapDispatchToProps = dispatch => ({
	showDialog: dialog => dispatch(showDialog(dialog)),
	hideDialog: () => dispatch(showDialog(null))
});

const mapStateToProps = createStructuredSelector({
	location: makeSelectLocation(),
	initialize: selectInitialize()
});

class HomeLayout extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				{this.props.children && this.props.children}
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
