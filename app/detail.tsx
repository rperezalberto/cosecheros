import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Detail = () => {
    const params = useLocalSearchParams();

    const userString = typeof params.user === 'string' ? params.user : null;
    const parsedUser = userString ? JSON.parse(userString) : null;
    const encodedUrl = parsedUser.img.replace('/o/images/', '/o/images%2F');


    console.log('Image URL:', parsedUser?.img);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nombre: {parsedUser?.name}</Text>
            <Image
                style={styles.image}
                source={parsedUser?.img ? { uri: encodedUrl } : require("../assets/sheldon.png")}
            />
        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: 300,
        height: 600,
        marginTop: 20,
        resizeMode: "cover",

    },
});
