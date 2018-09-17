import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
	name: 'Bob',
	age: 55,
	isHuman: true
};

const setName = (state, action) => {
	return updateObject(state, {name: action.name})
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_NAME:
			return setName(state, action);
		default:
			return state;
	}
};

export default reducer;