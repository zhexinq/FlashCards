import { AsyncStorage } from 'react-native'

export const MY_FLASH_CARDS = 'my-flash-cards'

export function fetchAllDecks() {
	return AsyncStorage.getItem(MY_FLASH_CARDS).then(JSON.parse)
}

export function fetchDeck({ title }) {
	return AsyncStorage.getItem(MY_FLASH_CARDS)
				.then( (results) => {
					const cards = JSON.parse(results)
					return cards[title]
				} ) 
}

export function saveDeckTitle({ title }) {
	return AsyncStorage.mergeItem(MY_FLASH_CARDS, JSON.stringify({
		[title]: {
			title: title,
			questions: []
		}
	}))
}

export function addCardToDeck({ title, card }) {
	return AsyncStorage.getItem(MY_FLASH_CARDS)
				.then( (results) => {
					const cards = JSON.parse(results)
					cards[title]['questions'].push(card)
					AsyncStorage.setItem(MY_FLASH_CARDS, JSON.stringify(cards))
				} )
}

export function initDummyData() {
	return AsyncStorage.setItem(MY_FLASH_CARDS, JSON.stringify(dummyData))
}

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
