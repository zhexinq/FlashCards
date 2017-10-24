import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck as addCardToDeckAction } from '../actions'
import { addCardToDeck } from '../utils/api'
import { black, white } from '../utils/colors'
import { MAX_CARD_CHARS } from '../utils/constants'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
	state = {
		question: null,
		answer: null
	}

	onQuestionChangeText = (text) => {
		this.setState({
			question: text
		})
	}

	onAnswerChangeText = (text) => {
		this.setState({
			answer: text
		})
	}

	onFormSubmit = () => {
		if (this.validate()) {
			const { dispatch, navigation } = this.props
			const { deckTitle } = this.props.navigation.state.params
			const { question, answer } = this.state
			const card = {
				question,
				answer 
			}

			dispatch(addCardToDeckAction(deckTitle, card))
			addCardToDeck({
				title: deckTitle,
				card: card
			})
			navigation.goBack()
		}
	}

	validate = () => {
		const { question, answer } = this.state
		if (this.isNullOrEmpty(question)) {
			alert('Questin cannot be empty.')
			return false
		} else if (this.isNullOrEmpty(answer)) {
			alert('Answer cannot be empty.')
			return false
		} else {
			alert('Card is added!')
			return true
		}
	}

	isNullOrEmpty = (text) => (text === null || text.length === 0)

	render() {
		const { deckTitle } = this.props.navigation.state.params
		const deck = this.props.decks[deckTitle]

		return (
			<KeyboardAvoidingView  behavior='padding' style={styles.container}>
				<TextInput style={styles.inputTitle} 
					placeholder='Enter the question here.' 
					onChangeText={this.onQuestionChangeText} 
					value={this.state.question}
					maxLength={MAX_CARD_CHARS} />
				<TextInput style={styles.inputTitle} 
					placeholder='Enter the answer here.' 
					onChangeText={this.onAnswerChangeText} 
					value={this.state.answer}
					maxLength={MAX_CARD_CHARS} />
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

export default connect(mapStateToProps)(AddCard)