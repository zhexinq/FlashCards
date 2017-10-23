import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckTitle } = navigation.state.params

		return {
			title: deckTitle
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(
					'Quiz'
				)}>
				<Text>
					Deck detail
				</Text>
			</TouchableOpacity>
		)
	}
}



export default DeckDetail