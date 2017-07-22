import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'react-router-dom/Link';
import L from 'leaflet';
import Geosuggest from 'react-geosuggest';
import logo from 'assets/img/marker.png';
import { MessageBar } from 'components/MessageBar';
import { getTypeOfProperty } from './actions';
import 'assets/css/geosuggest.css';

const MarkerIcon = L.icon({
	iconUrl: `${logo}`,
	iconRetinaUrl: `${logo}`,
	iconSize: [50, 50],
	iconAnchor: [50, 50],
	popupAnchor: [-3, -20]
});

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
	loadTypeOfProperty: () => dispatch(getTypeOfProperty())
});

class ListRoom extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.loadTypeOfProperty();
	}
	render() {
		return (
			<div className="container grid">
				<h1>List your Room</h1>
				<form className="form">
					<div className="field">
						<input type="text" name="listingName" />
					</div>
					<div className="field">
						<input type="text" name="listingName" />
					</div>
					<div className="field">
						<input type="text" name="listingName" />
					</div>
					<div className="field">
						<input type="text" name="listingName" />
					</div>
					<div className="field">
						<input type="text" name="listingName" />
					</div>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRoom);
