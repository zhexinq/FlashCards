import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Grading from 'react-native-grading'
import { white, black } from '../utils/colors'

export default function QuizSummary ({ score, scoreBase }) {
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
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
