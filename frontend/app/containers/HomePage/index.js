import React from 'react';
import Helmet from 'react-helmet/lib/Helmet';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	makeSelectLocation,
	makeSelectTokenMessage,
	makeSelectDialog,
	selectInitialize
} from 'containers/App/selectors';
import { showDialog } from 'containers/App/actions';
// import Navbar from "components/Navbar";
import Header from 'components/Header';
import Destination from 'components/Destination';
import SearchDestination from 'components/SearchDestination';
// import Advertise from "components/Advertise";
import Listing from 'components/Listing';
import Book from 'components/Book';
import RecentlyAddedRoom from 'components/Book';
// import Footer from "components/Footer";

const mapDispatchToProps = dispatch => ({
	showDialog: dialog => dispatch(showDialog(dialog)),
	hideDialog: () => dispatch(showDialog(null))
	// loginRequest: data => dispatch(loginRequest(data))
});

const mapStateToProps = createStructuredSelector({
	location: makeSelectLocation(),
	initialize: selectInitialize(),
	dialog: makeSelectDialog()
});

class HomePage extends React.PureComponent {
	constructor() {
		super();
	}

	render() {
		return (
			<article>
				<Helmet
					title="Home Page"
					meta={[
						{
							name: 'description',
							content: 'RoomFinder - Excellent and Unbeatable Travel Packages'
						}
					]}
				/>
				<Header />
				<SearchDestination />
				<RecentlyAddedRoom />
				<RecentlyAddedRoom />
				<Listing />
				<RecentlyAddedRoom />
				<Book />
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
