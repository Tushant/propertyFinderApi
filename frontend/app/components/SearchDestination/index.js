import React from 'react';

const SearchDestination = () => {
	return (
		<div className="simple-search" style={{ marginBottom: '2em' }}>
			<div className="container">
				<form className="massive form">
					<div className="field">
						<div className="left icon input">
							<input type="text" name="search" placeholder="street, city or address" />
							<i className="icon icon-search" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SearchDestination;
