import React from 'react';
import ReactDOM from 'react-dom';
import HappyHour from './HappyHour.js';

const BarPage = (props) => {
	console.log(props)
	return (
		<div className="container">
			<div className="flickity">
				<h4>Flickity Goes here</h4>
			</div>
			<div className="main">
				<div className="wrapper">
					<button onClick={props.backBarToHome}>Go Back</button>
					<button onClick={props.addToFavs}>Add to Favourites</button>
				</div>
			</div>
			<section className='body'>
				<section className="results">
					<h1>{props.bar.name}</h1>
					<p>{props.bar.url}</p>
					<p>{props.bar.rating}</p>
					{props.barPhotos.map((photo, i) => {
						if (i < 6) {
							return (
								<img src={`${photo.prefix}500x500${photo.suffix}`} alt="" />
								)
						}
					})}
				</section>
				<section className="map">
					
				</section>
				
			</section>
		</div>
		)
}

export default BarPage