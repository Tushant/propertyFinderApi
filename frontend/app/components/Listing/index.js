import React from 'react';
import Link from 'react-router-dom/Link';
import room from 'assets/img/room.jpg';

const Listing = () => {
	return (
		<div className="container grid">
			<div className="fluid eight wide column list-room-banner">
				<div>
					<h3>List Your Room </h3>
					<p>
						Two sentences that support the Headline and tell why it is good to list in RoomFinder
					</p>
					<br />
					<Link className="roomfinder-btn" to="list/hotel">
						List Room
					</Link>
				</div>
			</div>
			<div className="fluid eight wide column list-room-image">
				<div>
					<img src={room} alt="room" className="img-fluid" />
				</div>
			</div>
		</div>
	);
};

export default Listing;
