import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import stay from 'assets/img/destination/stay.svg';
// import fly from "assets/img/destination/fly.svg";
// import ride from "assets/img/destination/ride.svg";
import Fly from 'components/Animation/fly';
import Ride from 'components/Animation/ride';

import messages from './messages';

class Header extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div className="container masthead" style={{ marginTop: '3em', padding: '1em' }}>
				<h1 style={{ fontSize: '3em', fontWeight: 600 }}>Find Room Per your Needs</h1>
			</div>
		);
	}
}

export default Header;
