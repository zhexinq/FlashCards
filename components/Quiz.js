import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import FlipCard from 'react-native-flip-card'
import { white, red, green } from '../utils/colors'
import QuizSummary from './QuizSummary'

class Quiz extends Component {
	state = {
		answered: 0,
		correct: 0
	}

	onCorrectBtnClick = () => {
		this.setState((state) => ({
			answered: state.answered + 1,
			correct: state.correct + 1
		}))
	}

	onWrongBtnClick = () => {
		this.setState((state) => ({
			answered: state.answered + 1
		}))
	}	

	render() {
		const { deckTitle } = this.props.navigation.state.params
		const deck = this.props.decks[deckTitle]
		const total = deck.questions.length
		const { answered, correct } = this.state
		const question = deck.questions[answered]

		if (answered === total) {
			return <QuizSummary score={this.state.correct} scoreBase={total} />
		}

		return (
			<View style={styles.container}>
				<Text style={styles.countHeader}>
					{total - answered} / {total}
				</Text>
				<View style={styles.container}>
					<View style={styles.container}>
						<FlipCard style={styles.flipCard}>
							<View style={styles.face}>
								<Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>
									{question.question}
								</Text>
								<Text style={{fontSize: 15, fontWeight: 'bold', color: red}}>
									Tap to see answer.
								</Text>
							</View>
							<View style={styles.back}>
								<Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>
									{question.answer}
								</Text>
								<Text style={{fontSize: 15, fontWeight: 'bold', color: red}}>
									Tap to see question.
								</Text>								
							</View>						
						</FlipCard>
					</View>
					<View style={styles.container}>
						<TouchableOpacity style={[styles.correctButton]} onPress={this.onCorrectBtnClick}>
							<Text style={{color: white, fontSize: 16, textAlign: 'center'}}>
								Correct
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.wrongButton} onPress={this.onWrongBtnClick}>
							<Text style={{color: white, fontSize: 16, textAlign: 'center'}}>
								Incorrect
							</Text>							
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flipCard: {
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
	},
	face: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	back: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countHeader: {
		alignSelf: 'flex-start',
		marginLeft: 10,
		marginTop: 10,
		fontSize: 20
	},
	correctButton: {
		width: 240,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 80,
		paddingRight: 80,
		marginBottom: 20,
		backgroundColor: green,
		borderRadius: 12,
		borderWidth: 0,
	},
	wrongButton: {
		width: 240,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 80,
		paddingRight: 80,
		marginBottom: 20,
		backgroundColor: red,
		borderRadius: 12,
		borderWidth: 0,
	}
})

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Quiz)