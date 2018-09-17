import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import * as actions from '../../store/actions/index';

class Example extends Component {
	render() {
		return (
			<div>
				<p>Current name: {this.props.name}</p>
				<p>Current age: {this.props.age}</p>
				<p>Is {this.props.name} human ?: {(this.props.isHuman) ? "Yes" : "No"}</p>
				<Button color="primary" variant="outlined" onClick={() => this.props.onSetName('Tiit')}>Set Name To
					"Tiit"</Button>
				<Button color="secondary" variant="outlined" onClick={() => this.props.onSetName('Priit')}>Set Name To
					"Priit"</Button>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		name: state.example.name,
		age: state.example.age,
		isHuman: state.example.isHuman
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSetName: (name) => dispatch(actions.setName(name))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
