import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'


const NOTIFICATION_KEY = 'FlashCards::notifications'

export function clearNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
			.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
	return {
		title: 'Challenge yourself!',
		body: "🤠 Don't forget to quiz with the flash cards today.",
		ios: {
			sound: true
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHour(20)
							tomorrow.setMinutes(0)

							Notifications.scheduleLocalNotificationAsyc(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day'
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})

			}
		})
}