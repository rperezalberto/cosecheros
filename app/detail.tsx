import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const detail = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>detail{id}</Text>
        </View>
    )
}

export default detail

const styles = StyleSheet.create({})