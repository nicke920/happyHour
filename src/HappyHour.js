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
			ratingSort: false,
			filterText: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.order = this.order.bind(this);
		this.alphabetical= this.alphabetical.bind(this);
		this.ratingSort = this.ratingSort.bind(this);
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
	ratingSort() {
		if (this.state.ratingSort === false) {
			function compare(a,b) {
			  if (a.venue.rating > b.venue.rating)
			    return -1;
			  if (a.venue.rating < b.venue.rating)
			    return 1;
			  return 0;
			}
			const sortedNewArray = this.state.barsArray.sort(compare);

			this.ratingSort1.classList.toggle('hide');
			this.ratingSort2.classList.toggle('hide');
			this.setState({
				barsArray: sortedNewArray,
				ratingSort: true
			})
		}

		if (this.state.ratingSort === true) {
			function compare(a,b) {
			  if (a.venue.rating < b.venue.rating)
			    return -1;
			  if (a.venue.rating > b.venue.rating)
			    return 1;
			  return 0;
			}
			const sortedNewArray = this.state.barsArray.sort(compare);
			
			this.ratingSort1.classList.toggle('hide');
			this.ratingSort2.classList.toggle('hide');
			this.setState({
				barsArray: sortedNewArray,
				ratingSort: false
			})
		}
	}
	componentDidMount() {
		console.log('working')
	}
	handleChange(event) {
	   this.setState({
	   	[event.target.name]: event.target.value,
	   	city: event.target.id

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
				radius: 500,
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
									<div className="side">
										<div>
											<p className='barRating'>{bar.venue.rating}</p>
										</div>
										<div>
											<img src="../images/icons/wallet.png" alt=""/>
											<p>{bar.venue.price.currency}</p>
										</div>
										<div>
											<img src="../images/icons/walk.png" alt=""/>
											<p className='distanceValue'>{`${(bar.venue.location.distance / 100).toFixed(1)}km`}</p>
										</div>
									</div>
								</div>
								<div className="barInfo">
										<h5>{bar.venue.name}</h5>
									<div className="main">
										<p>{bar.venue.location.address}</p>
									</div>
									<div className="secondary">
										<Link to={`/venues/${bar.venue.id}`}>Click dawg</Link>
									</div>
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
				<section className="site-hero">
						<nav>
							<div className="wrapper">
								<div className="logo">
									<h2>happyHour</h2>
								</div>
								<ul>
									<li>Home</li>
									<li>About Us</li>
									<li>Blog</li>
									<li>Contact</li>
								</ul>
							</div>
						</nav>
						<div className="header-content">
							<div className="wrapper">
								<h1>Find Your Happy Hour</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus quaerat quos ab, maxime dignissimos culpa!</p>
									<form onChange={this.handleChange} onSubmit={this.submitForm} className="form">
											<div className="inputs">
												<p>Neighbourhoods</p>
												<div className='cityInput'>
													<label htmlFor="Downtown">Downtown</label>
													<input type="radio" name="location" id="Downtown" value="49.28145,-123.121" />
												</div>

												<div className='cityInput'>
													<label htmlFor="Kits">Kits</label>
													<input type="radio" name="location" id="Kits" value="49.2726,-123.159" />
												</div>

												<div className='cityInput'>
													<label htmlFor="Main">Main St</label>
													<input type="radio" name="location" id="Main" value="49.260035, -123.101093" />
												</div>

												<div className='cityInput'>
													<label htmlFor="Gastown">Gastown</label>
													<input type="radio" name="location" id="Gastown" value="49.282714, -123.106157" />
												</div>
											</div>
										<input type="submit" id="formSubmit"/>
									</form>
							</div>
						</div>
				</section>
				
				<section className="body">
				<Map bars={this.state.barsArray}/>
					<div className="filters">
						<div className="wrapper">
							<input onChange={this.handleChange} type="text" name="filterText" placeholder='search...'/>
							<button className='orderclose' onClick={this.order} ref={ref => this.sortButton = ref}>Sorted: Longest</button>
							<button className='orderlong hide' onClick={this.order} ref={ref => this.sortButton1 = ref}>Sorted: Closest</button>

							<button onClick={this.alphabetical} ref={ref => this.alphabetical1 = ref}>Alphabetically: A-Z</button>
							<button className='hide' onClick={this.alphabetical} ref={ref => this.alphabetical2 = ref}>Alphabetically: Z-A</button>

							<button onClick={this.ratingSort} ref={ref => this.ratingSort1 = ref}>Sorted: Highest to Lowest</button>
							<button onClick={this.ratingSort} className='hide' ref={ref => this.ratingSort2 = ref}>Sorted: Lowest to Highest</button>
						</div>
					</div>

					

					<section className="results">
						<div className="wrapper">
							{barList}
						</div>
					</section>
					
				</section>
			</div>
			)
	}

}
