import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function index() {
    const isOnBoarding = true // Replace with your actual condition to check if onBoarding is needed
  if (isOnBoarding) {
      return <Redirect href="/onBoarding" />
  }
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}