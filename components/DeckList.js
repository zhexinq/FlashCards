import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { fetchAllDecks, fetchDeck, saveDeckTitle, addCardToDeck } from '../utils/api'
import { white, gray } from '../utils/colors'
import { receiveDecks } from '../actions'
import { AppLoading} from 'expo'

class DeckList extends Component {
	state = {
		ready: false
	}

	componentDidMount() {
		const { dispatch } = this.props

		fetchAllDecks()
			.then((results) => dispatch(receiveDecks(results)))
			.then(() => this.setState(() => { ready: true }))
	}

	_renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity 
				onPress={() => this.props.navigation.navigate(
					'DeckDetail',
					{ deckTitle: item.title }
				)} 
				style={{ alignSelf: 'stretch' }}>
				<Text style={{ textAlign: 'center', fontSize: 18 }}>
					{item.title}
				</Text>
				<Text style={{ textAlign: 'center', color: gray }}>
					{item.questions.length} cards
				</Text>
			</TouchableOpacity>
		</View>
	)

	_keyExtractor = (item) => (item.title)

	render() {
		const { ready, decks } = this.props

		console.log('invocation###########')
		console.log(decks)

		if (ready === false) {
			return <AppLoading />
		}

		return <FlatList 
					data={decks && Object.keys(decks).map(key => (decks[key]))} 
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor} />
	}
}

const styles = StyleSheet.create({
	item: {
	    backgroundColor: white,
	    borderRadius: Platform.OS === 'ios' ? 16 : 2,
	    padding: 20,
	    marginLeft: 10,
	    marginRight: 10,
	    marginTop: 17,
	    justifyContent: 'center',
	    shadowRadius: 3,
	    shadowOpacity: 0.8,
	    shadowColor: 'rgba(0, 0, 0, 0.24)',
	    shadowOffset: {
	      width: 0,
	      height: 3
	    },
	}
})


function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)