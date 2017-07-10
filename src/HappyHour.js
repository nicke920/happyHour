import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import Map from './Map.js';
import BarPage from './BarPage.js';
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
			filterText: '',
			location: '',
			barPageOpen: false,
			favsPageOpen: false,
			selectedBar: {},
			selectedBarID: '',
			selectedBarPhotos: [],
			userFavsArray: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.submitFormTopNav = this.submitFormTopNav.bind(this);
		this.order = this.order.bind(this);
		this.alphabetical= this.alphabetical.bind(this);
		this.ratingSort = this.ratingSort.bind(this);
		this.selectBar = this.selectBar.bind(this);
		this.backBarToHome = this.backBarToHome.bind(this);
		this.addToFavs = this.addToFavs.bind(this);
		this.viewFavs = this.viewFavs.bind(this);
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
				barsArray: barsData,
				location: ''
			}) 
		})
		this.homepageSearch.classList.toggle('hide');
		this.searchedTopNav.classList.toggle('hide');
	}
	submitFormTopNav(e) {	
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
				barsArray: barsData,
				location: ''
			}) 
		})
	}
	selectBar(bar) {
		ajax({
			  url: `https://api.foursquare.com/v2/venues/${bar.venue.id}/photos`,
			  dataType: 'json',
			  data: {
			    oauth_token: 'CZFPQNSPUHEXWCREUHVGTO2KYUBZKS5KE2ZPVW0QQBS4HCFR',
			    v: '20170617',
			    limit: 200
			  }
			})
		.then((result) => {
			console.log('new', result);
			this.setState({
				selectedBar: bar.venue,
				selectedBarID: bar.venue.id,
				selectedBarPhotos: result.response.photos.items,
				barPageOpen: true
			})
		})
		if (this.homepageSearchResults !== null) {
			this.homepageSearchResults.classList.add('hide')
		}
		if (this.barPageResult !== null) {
			this.barPageResult.classList.remove('hide')
		}
	}
	backBarToHome() {
		if (this.homepageSearchResults !== null) {
			this.homepageSearchResults.classList.remove('hide')
		}
		if (this.barPageResult !== null) {
			this.barPageResult.classList.add('hide')
		}
		
		this.setState({
			selectedBar: '',
			selectedBarID: '',
			selectedBarPhotos: [],
			barPageOpen: false
		})
	}
	addToFavs() {
		const userFavs = this.state.userFavsArray;
		userFavs.push(this.state.selectedBar);
		this.setState({
			userFavsArray: userFavs
		})
	}
	viewFavs() {
		this.setState({
			favsPageOpen: true
		})
		if (this.homepageSearchResults !== null) {
			this.homepageSearchResults.classList.add('hide')
		}
		if (this.barPageResult !== null) {
			this.barPageResult.classList.add('hide')
		}
	}

	render() {
		let barList = [];
		//once results come back, user can enter filter text to go through the bars
			if (this.state.filterText.length === 0) {
				barList = this.state.barsArray
					.map((bar, i) => {
						if (bar.venue.featuredPhotos !== undefined) {
							return (
								<div className="tile single"> 
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
												<button onClick={() => this.selectBar(bar)}>Select</button>
										</div>
									</div>
							)
						}
				})
			} else {
				barList = this.state.barsArray
					.filter((bar) => {
						return bar.venue.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >= 0
					})
					.map((bar, i) => {
						if (bar.venue.featuredPhotos !== undefined) {
							return (
								<div className="tile single"> 
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
												<button onClick={() => this.selectBar(bar)}>Select</button>
										</div>
									</div>
							)
						}
				})
			}

		let favsBarList = [];
		if (this.state.favsPageOpen === true && this.state.userFavsArray.length > 0) {
			console.log('999', this.state.barsArray.map((bar) => {
				bar.name
			}))
		}
		


		return (
			<div className="container">
				<section className="site-hero homepage"  ref={ref => this.homepageSearch = ref}>
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
				<section className="header-content searched hide" ref={ref => this.searchedTopNav = ref}>
					<div className="wrapper">
						<form onChange={this.handleChange} onSubmit={this.submitFormTopNav} className="form">
								<div className="inputs">
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
							<button type='submit' id='formSubmit'>
								<i className="fa fa-search" aria-hidden="true"></i>
							</button>
						</form>
						<div className='top-right-nav'>
							<a href="#">Home</a>
							<button onClick={this.viewFavs}>Favourites</button>
						</div>
					</div>
				</section>
				
				<section className="body homepageSearchResults" ref={ref => this.homepageSearchResults = ref}>
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
				<BarPage 
					bar={this.state.selectedBar} 
					barPhotos={this.state.selectedBarPhotos} 
					backBarToHome={this.backBarToHome} 
					addToFavs = {this.addToFavs}
					className="barPageResult hide" 
					ref={ref => this.barPageResult = ref}
				/>
				{favsBarList}
			</div>
			)
	}

}
