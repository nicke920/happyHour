import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import Map from './Map.js';
import { concat, sortBy, map, sample } from 'lodash'
import { Router, Route, browserHistory, Link } from 'react-router';



export default class HappyHour extends React.Component {
	constructor() {
		super();
		this.state = {
			barsArray: [],
			apiKey: 'AIzaSyB5vnjckpsv4k5pj7qaeGeVlr3D91i-eaQ',
			sorted: false,
			alphabetical: false,
			filterText: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.order = this.order.bind(this);
		this.alphabetical= this.alphabetical.bind(this);
	}
	order() {
		if (this.state.sorted === false) {
			function compare(a,b) {
			  if (a.venue.location.distance > b.venue.location.distance)
			    return -1;
			  if (a.venue.location.distance < b.venue.location.distance)
			    return 1;
			  return 0;
			}
			const sorted = this.state.barsArray.sort(compare);
			this.sortButton.classList.toggle('hide');
			this.sortButton1.classList.toggle('hide');
			this.setState({
				barsArray: sorted,
				sorted: true
			})

		}
		if (this.state.sorted === true) {
			function compare(a,b) {
			  if (a.venue.location.distance < b.venue.location.distance)
			    return -1;
			  if (a.venue.location.distance > b.venue.location.distance)
			    return 1;
			  return 0;
			}
			const sorted = this.state.barsArray.sort(compare);
			this.sortButton.classList.toggle('hide');
			this.sortButton1.classList.toggle('hide');
			this.setState({
				barsArray: sorted,
				sorted: false
			})
		}
		
		console.log('soret', sorted);
	}
	alphabetical() {
		if (this.state.alphabetical === false) {
			function compare(a,b) {
			  if (a.venue.name > b.venue.name)
			    return -1;
			  if (a.venue.name < b.venue.name)
			    return 1;
			  return 0;
			}
			const alpha = this.state.barsArray.sort(compare);

			this.alphabetical1.classList.toggle('hide');
			this.alphabetical2.classList.toggle('hide');
			this.setState({
				barsArray: alpha,
				alphabetical: true
			})
		}

		if (this.state.alphabetical === true) {
			function compare(a,b) {
			  if (a.venue.name < b.venue.name)
			    return -1;
			  if (a.venue.name > b.venue.name)
			    return 1;
			  return 0;
			}
			const alpha = this.state.barsArray.sort(compare);
			
			this.alphabetical1.classList.toggle('hide');
			this.alphabetical2.classList.toggle('hide');
			this.setState({
				barsArray: alpha,
				alphabetical: false
			})
		}

	}
	componentDidMount() {
		console.log('working')
	}
	handleChange(event) {
	   this.setState({
	   	[event.target.name]: event.target.value
	   });
	 }
	submitForm(e) {	
		e.preventDefault();
		const barArea = this.state.location;
		// console.log(this.state.location)
		ajax({
			url: "https://api.foursquare.com/v2/venues/explore",
			dataType: 'json',
			data: {
				ll: barArea,
				radius: 1000,
				client_id: '3BUKQ0PLD3SPNW4KRDRH05W3PHE3M23EA1YSOBKJEQUQG4C0',
				client_secret: 'QTAIFHU51DLAHY4U3VLUAA5CVIVGNLPJOJVSOCCYMGOEWP4T',
				v: "20170304",
				section: 'drinks, specials',
				limit: 10000, 
				price: '1,2,3,4',
				venuePhotos: 1,
				time: 'any',
				day: 'any'
		
			}
		})
		.then((result) => {
			const barsData = result.response.groups[0].items;
			this.setState({
				barsArray: barsData
			}) 
			console.log('new', this.state.barsArray);
		})
	}
	render() {
		const locationCenter = {
			lat: '49.260035',
			lng: '-123.101093'
		}

		let barList = [];

		
			if (this.state.filterText.length === 0) {
				barList = this.state.barsArray
					.map((bar, i) => {
					return (<div className="tile single"> 
								<div className="barPhoto">
									<img src={`${bar.venue.featuredPhotos.items[0].prefix}600x600${bar.venue.featuredPhotos.items[0].suffix}`}/>
								</div>
								<div className="barInfo">
									<h3>{bar.venue.name}</h3>
									<p>{bar.venue.rating}</p>
									<p>{bar.venue.location.address}</p>
									<p>{`${bar.venue.location.distance}m`}</p>
									<p>{`${bar.venue.location.city}, ${bar.venue.location.state}`}</p>
									<Link to={`/venues/${bar.venue.id}`}>Click dawg</Link>
								</div>
							</div>
					)
				})
			} else {
				barList = this.state.barsArray
					.filter((bar) => {
						return bar.venue.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >= 0
					})
					.map((bar, i) => {
					return (<div className="tile single"> 
								<div className="barPhoto">
									<img src={`${bar.venue.featuredPhotos.items[0].prefix}600x600${bar.venue.featuredPhotos.items[0].suffix}`}/>
								</div>
								<div className="barInfo">
									<h3>{bar.venue.name}</h3>
									<p>{bar.venue.rating}</p>
									<p>{bar.venue.location.address}</p>
									<p>{`${bar.venue.location.distance}m`}</p>
									<p>{`${bar.venue.location.city}, ${bar.venue.location.state}`}</p>
									<Link to={`/venues/${bar.venue.id}`}>Click dawg</Link>
								</div>
							</div>
					)
				})
			}

		return (
			<div className="container">
				<section className="form">
					<form onChange={this.handleChange} onSubmit={this.submitForm}>
						<label htmlFor="Downtown">Downtown:</label>
						<input type="radio" name="location" id="Downtown" value="49.28145,-123.121"/>
						<label htmlFor="Kits">Kits:</label>
						<input type="radio" name="location" id="Kits" value="49.2726,-123.159"/>
						<label htmlFor="Gastown">Gastown:</label>
						<input type="radio" name="location" id="Gastown" value="49.282714, -123.106157"/>
						<label htmlFor="Main">Main St:</label>
						<input type="radio" name="location" id="Main" value="49.260035, -123.101093"/>
						<input type="submit"/>
					</form>
				</section>
				<section className="body">
					<section className="results">
						<h4>Restaurants</h4>
						<input onChange={this.handleChange} type="text" name="filterText"/>
						<button className='orderclose' onClick={this.order} ref={ref => this.sortButton = ref}>Sorted: Longest</button>
						<button className='orderlong hide' onClick={this.order} ref={ref => this.sortButton1 = ref}>Sorted: Closest</button>

						<button onClick={this.alphabetical} ref={ref => this.alphabetical1 = ref}>Alphabetically: A-Z</button>
						<button className='hide' onClick={this.alphabetical} ref={ref => this.alphabetical2 = ref}>Alphabetically: Z-A</button>
						{barList}
					</section>
					<section className="map">
						<Map bars={this.state.barsArray}/>
					</section>
				</section>
			</div>
			)
	}

}
