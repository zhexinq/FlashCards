import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckTitle } = navigation.state.params

		return {
			title: deckTitle
		}
	}

	render() {
		const { deckTitle } = this.props.navigation.state.params
		const deck = this.props.decks[deckTitle]

		console.log('Deck detail:')
		console.log(deck)

		return (
			<View style={styles.container}>
				<View style={[styles.section, {flex: 7}]}>
					<Text style={{fontSize: 38, fontWeight: 'bold', marginBottom: 20}}>
						{deck.title}
					</Text>
					<Text style={{fontSize: 20, color: gray}}>
						{deck.questions.length} cards
					</Text>
				</View>
				<View style={[styles.section, {flex: 3}]}>
					<TouchableOpacity style={styles.lightButton}>
						<Text style={{fontSize: 16}}>Add Card</Text>						
					</TouchableOpacity>
					<TouchableOpacity 
						style={styles.darkButton}
						onPress={() => this.props.navigation.navigate(
							'Quiz',
							{ deckTitle: deckTitle }
						)}>
						<Text style={{color: white, fontSize: 16}}>Start Quiz</Text>						
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	section: {
		flex: 1,
	    backgroundColor: white,
	    padding: 20,
	    justifyContent: 'center',
	    alignItems: 'center'
	},
	lightButton: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 50,
		paddingRight: 50,
		marginBottom: 20,
		backgroundColor: white,
		borderRadius: 4,
		borderColor: black,
		borderWidth: 0.5
	},
	darkButton: {
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

function mapStateToProps(decks) {
	return {
		decks
	}
}


export default connect(mapStateToProps)(DeckDetail)