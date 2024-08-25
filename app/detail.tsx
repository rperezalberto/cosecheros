import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Detail = () => {
    const params = useLocalSearchParams();

    const userString = typeof params.user === 'string' ? params.user : null;
    const parsedUser = userString ? JSON.parse(userString) : null;
    const encodedUrl = parsedUser.img.replace('/o/images/', '/o/images%2F');

    return (
        <View style={styles.container}>
            <View className='flex-row items-center'>
                <Text style={styles.title}>Nombre:</Text>
                <Text className='pl-1 text-2xl text-zinc-600'>{parsedUser?.name}</Text>
            </View>
            <View className='flex-row items-center'>
                <Text style={styles.title}>Provincia:</Text>
                <Text className='pl-1 text-2xl text-zinc-600'>{parsedUser?.province}</Text>
            </View>
            <View className='flex-row items-center'>
                <Text style={styles.title}>Id:</Text>
                <Text className='pl-1 text-1xl text-zinc-600'>{parsedUser?.id}</Text>
            </View>
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
        paddingHorizontal: 10,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        alignSelf: 'center'
    },
});
