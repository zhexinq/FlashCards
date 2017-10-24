import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { MAX_DECK_CHARS } from '../utils/constants'
import { black, white } from '../utils/colors'

class NewDeck extends Component {
	state = {
		deckTitle: null
	}

	_onChangeText = (text) => {
		this.setState({
			deckTitle: text
		})
	}

	onFormSubmit = () => {
		if (this.validate()) {
			const { dispatch } = this.props
			const title = this.state.deckTitle
			const deck = {
				[title]: {
					title: title,
					questions: []
				}
			}
			dispatch(addDeck(deck))
			saveDeckTitle({ title: title })
			this.setState({
				deckTitle: ''
			})
		}
	}

	validate = () => {
		const { decks } = this.props
		const title = this.state.deckTitle

		console.log('validation###')
		console.log(decks)

		if (!title || title.length === 0) {
			alert('Deck title cannot be empty.')
			return false
		} else if (decks[title]) {
			alert('A deck with the same title already exists.')
			return false
		} 
		alert('Deck is added!')
		return true
	}

	render() {


		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.instruction}>
					What is the title of your new deck?
				</Text>
				<TextInput style={styles.inputTitle} 
					placeholder='Deck Title' 
					onChangeText={this._onChangeText} 
					value={this.state.deckTitle}
					maxLength={MAX_DECK_CHARS} />
				<TouchableOpacity 
					onPress={this.onFormSubmit}
					style={styles.submit}>
					<Text style={{ color: white, fontSize: 16 }}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	instruction: {
		fontSize: 50,
		marginBottom: 40,
		textAlign: 'center'
	},
	inputTitle: {
		width: 250,
		borderWidth: 2,
		borderRadius: 4,
		padding: 10,
		textAlign: 'center',
		marginBottom: 40,
	},
	submit: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 50,
		paddingRight: 50,
		marginBottom: 20,
		backgroundColor: black,
		borderRadius: 4,
		borderColor: black,
		borderWidth: 0.5
	}		
})

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(NewDeck)