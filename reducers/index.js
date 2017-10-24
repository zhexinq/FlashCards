import {
	RECEIVE_DECKS,
	ADD_DECK,
	ADD_CARD_TO_DECK
} from '../actions'


export default function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				...action.deck
			}
		case ADD_CARD_TO_DECK:
			const { title, card } = action
			const newState = Object.assign({}, state)
			newState[title].questions.push(card)
			return newState 
	}
}