import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet/lib/Helmet';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import HomePage from 'containers/HomePage/Loadable';
import HomeLayout from 'containers/HomePage/containers/HomeLayout';
import ListRoom from 'containers/HomePage/containers/ListRoom/Loadable';
import BlankLayout from 'containers/HomePage/containers/BlankLayout';
import { makeSelectLocation, makeSelectError } from 'containers/App/selectors';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { loadInitialData } from 'containers/App/actions';
// import UserProfileLayout from 'containers/UserProfile/containers/UserLayout';
import Error from 'components/ErrorPage/500';

const mapStateToProps = createStructuredSelector({
	location: makeSelectLocation(),
	error: makeSelectError()
});

const mapDispatchToProps = dispatch => ({
	loadInitialData: () => dispatch(loadInitialData())
});

export class App extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	componentWillMount() {
		setTimeout(
			console.log.bind(console, '%RoomFinder', 'font: 8em sans-serif; color: #c3922e;'),
			0
		);
		this.props.loadInitialData();
	}
	render() {
		if (this.props.error && this.props.error.status === 500) {
			return <Error location={this.props.location} />;
		}
		return (
			<article>
				<Helmet titleTemplate="%s - RoomFinder" defaultTitle="RoomFinder">
					<meta name="description" content="RoomFinder" />
				</Helmet>
				<Switch location={this.props.location}>
					<Route
						exact
						path="/"
						render={() =>
							<HomeLayout>
								<HomePage />
							</HomeLayout>}
					/>
					<Route
						path="/list/room"
						render={() =>
							<HomeLayout>
								<ListRoom />
							</HomeLayout>}
					/>
					<Route
						path=""
						render={() =>
							<BlankLayout>
								<NotFoundPage />
							</BlankLayout>}
					/>
				</Switch>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
