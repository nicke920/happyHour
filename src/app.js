import React from 'react';
import ReactDOM from 'react-dom';
import HappyHour from './HappyHour.js';
import BarDetails from './BarDetails.js';
import { Router, Route, browserHistory, Link } from 'react-router';

class App extends React.Component {
	render() {
		return (
			<div>
				{ this.props.children }
			</div>
			)
	}
}

ReactDOM.render(<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/venues" component={HappyHour}/>
			<Route path="/venues/:venue_id" component={BarDetails} />
		</Route>
	</Router>, document.getElementById('app'))