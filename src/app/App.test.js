import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import example from '../store/reducers/example';

const rootReducer = combineReducers({
	example: example
});

const store = createStore(rootReducer);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Provider store={store}>
						<App/>
					</Provider>, div);
	ReactDOM.unmountComponentAtNode(div);
});
