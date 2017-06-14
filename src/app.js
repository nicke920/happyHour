import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Nigga we made it</h1>
				<p>nigga</p>
			</div>
			)
	}
}

ReactDOM.render(<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/help" component={App}/>
		</Route>
	</Router>, document.getElementById('app'))