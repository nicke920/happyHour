import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';



export default class HappyHour extends React.Component {
	constructor() {
		super();
		this.state = {
			barsArray: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
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
		const barRadius = this.state.distance;
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
				price: '1,2,3,4'
		
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
		return (
			<div>
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
					<input type="number" name="distance"/>
				</form>
				<h4>Componented</h4>
				{ this.state.barsArray.map((bar) => {
					return (<div> 
								<p>{bar.venue.name}</p>
							</div>
					)
				}) }
			</div>
			)
	}

}