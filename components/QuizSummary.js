import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Grading from 'react-native-grading'
import { white, black } from '../utils/colors'
import { clearLocalNotifictaion, setLocalNotification } from '../utils/helpers' 

class QuizSummary extends Component {
	state = {}

	componentDitMount() {
		clearLocalNotifictaion()
			.then(setLocalNotification)
	}

	render() {
		const { score, scoreBase, title, navigation, reset } = this.props

		return (
			<View style={styles.container}>
				<Grading 
					mode='arcs'
					score={Math.round(score * 100.0 / scoreBase)}
					activeColor={black}
					defaultColor={black}
					fontColor={black}
					isPercentage={true}
					readOnly={true}
					scale={3.0}
				/>
				<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
					{`You answered ${score} out of ${scoreBase} questions correctly.`}
				</Text>

				<TouchableOpacity 
					style={styles.lightButton}
					onPress={() => reset()}>
					<Text style={{fontSize: 16}}>Restart Quiz</Text>						
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.darkButton}
					onPress={() => navigation.goBack()}>
					<Text style={{color: white, fontSize: 16}}>Back to Deck</Text>						
				</TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	lightButton: {
		marginTop: 40,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 52,
		paddingRight: 52,
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

export default QuizSummary
