import React from 'react';
import ReactDOM from 'react-dom';
import HappyHour from './HappyHour.js';
import { Router, Route, browserHistory, Link } from 'react-router';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Nigga we made it</h1>
				<p>nigga</p>
				<Link to="/cuz">Go here</Link>
				{ this.props.children }
			</div>
			)
	}
}

ReactDOM.render(<Router history={browserHistory}>
		<Route path="/" component={HappyHour}>
			<Route path="/" component={App}/>
		</Route>
	</Router>, document.getElementById('app'))