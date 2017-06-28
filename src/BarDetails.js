import React from 'react';
import ReactDOM from 'react-dom';
import { ajax, when } from 'jquery';
import Map from './Map.js'
import HappyHour from './HappyHour.js'
import { Router, Route, browserHistory, Link } from 'react-router';




export default class BarDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			bar: {},
			barPhotos: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		when(
			ajax({
			  url: `https://api.foursquare.com/v2/venues/${this.props.params.venue_id}`,
			  dataType: 'json',
			  data: {
			    oauth_token: 'CZFPQNSPUHEXWCREUHVGTO2KYUBZKS5KE2ZPVW0QQBS4HCFR',
			    v: '20170617'
			  }
			}),
			ajax({
			  url: `https://api.foursquare.com/v2/venues/${this.props.params.venue_id}/photos`,
			  dataType: 'json',
			  data: {
			    oauth_token: 'CZFPQNSPUHEXWCREUHVGTO2KYUBZKS5KE2ZPVW0QQBS4HCFR',
			    v: '20170617',
			    limit: 200
			  }
			})
			).done((result, result1) => {
		  console.log('bar', result)
		  console.log('photos', result1)
				this.setState({
					bar: result[0].response.venue,
					barPhotos: result1[0].response.photos.items
				})
			})
		}

	handleChange(event) {
	   this.setState({
	   	[event.target.name]: event.target.value
	   });
	 }
	
	render() {
		return (
				<div className="container">
					<div className="flickity">
						<h4>Flickity Goes here</h4>
					</div>
					<div className="main">
						<div className="wrapper">
						</div>
					</div>
					<section className='body'>
						<section className="results">
							<h1>{this.state.bar.name}</h1>
							<p>{this.state.bar.url}</p>
							<p>{this.state.bar.rating}</p>
							{this.state.barPhotos.map((photo) => {
								return (
									<img src={`${photo.prefix}500x500${photo.suffix}`} alt="" />
									)
							})}
						</section>
						<section className="map">
							
						</section>
						
					</section>
				</div>
			)
	}
}
