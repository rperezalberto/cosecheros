import { Stack } from "expo-router";


const Rootayout = () => {
    return (
        <Stack initialRouteName="addUser">
            <Stack.Screen name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="addUser" options={{
                title: "Add Cosechores",
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: "transparent"
                },
            }} />
        </Stack>
    );
}

export default Rootayout;