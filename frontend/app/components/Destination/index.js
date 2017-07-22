import React from 'react';
import Masonry from 'react-masonry-component';
import { destinations } from './destinations';

const masonryOptions = {
	transitionDuration: '0.8s',
	columnWidth: 400,
	gutter: 30,
	isFitWidth: true
};

class Destination extends React.PureComponent {
	render() {
		const style = { marginTop: 30, width: 400 };
		const childElements = destinations.map(destination =>
			<div className="placesPhoto" key={destination.id}>
				<img
					key={destination.id}
					src={destination.image}
					alt={destination.city}
					style={style}
					className="img-responsive"
				/>
				<p>
					{destination.city}
				</p>
			</div>
		);
		return (
			<div className="container-fluid masthead">
				<h2 style={{ fontSize: '2.5em' }}>Find Your Destination</h2>
				<Masonry
					elementType={'div'}
					className="my-gallery-class"
					options={masonryOptions}
					onClick={this.handleClick}
				>
					{childElements}
				</Masonry>
			</div>
		);
	}
}

// const Destination = () => {
//   return (
//     <div className="container masthead">
//       <h2>Find Your...</h2>
//       <div className="row">
//         <div className="col-md-4">
//           <img src={stay} alt="stay" />
//           <h2>Stay</h2>
//           <p className="faded">
//             Where to stay? Just search over thousands of hotels with Xceltrip.
//           </p>
//         </div>
//         <div className="col-md-4">
//           <img src={fly} alt="fly" />
//           <h2>Fly</h2>
//           <p className="faded">
//             Where to stay? Just search over thousands of hotels with Xceltrip.
//           </p>
//         </div>
//         <div className="col-md-4">
//           <img src={ride} alt="ride" />
//           <h2>Ride</h2>
//           <p className="faded">
//             Where to stay? Just search over thousands of hotels with Xceltrip.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
export default Destination;
