import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './Layout.css';
import Example from '../Example/Example';

class Layout extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<Example/>
			</div>
		)
	}
}

export default Layout;