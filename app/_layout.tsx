import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";


const Rootayout = () => {
    return (

        <Provider store={store}>
            <Stack initialRouteName="index">
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

        </Provider>
    );
}

export default Rootayout;