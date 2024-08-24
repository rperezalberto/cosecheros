import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userData } from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import { UserIterface } from "../interfaces/userInterfaces";

interface UserState {
    userData: UserIterface[];
    isLoading: boolean;
    img: string;
}

const initialState: UserState = {
    userData,
    isLoading: false,
    img: "",
};

export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserIterface[]>) => {
            state.userData = action.payload;
            saveDataToAsyncStorage(state.userData); // Guardar en AsyncStorage
        },

        add: (state, action: PayloadAction<UserIterface>) => {
            state.isLoading = true;
            state.userData.push(action.payload);
            addCity(action.payload);
            saveDataToAsyncStorage(state.userData); // Guardar en AsyncStorage
            state.img = "";
            state.isLoading = false;
        },

        addImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        }
    },
});

// Función para guardar `userData` en AsyncStorage
const saveDataToAsyncStorage = async (userData: UserIterface[]) => {
    try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem('@user_data', jsonValue);
        console.log('userData guardado en AsyncStorage');
    } catch (error) {
        console.error('Error guardando userData en AsyncStorage', error);
    }
}

// Función para agregar un nuevo usuario en Firebase Firestore
const addCity = async (user: UserIterface) => {
    try {
        await setDoc(doc(collection(db, 'users'), user.id), user);
        console.log('Document successfully written!');
    } catch (error) {
        console.error('Error writing document: ', error);
        throw error;
    }
}

// Exporta las acciones generadas
export const { setUserData, add, addImg } = userSlice.actions;

// Exporta el reducer generado
export default userSlice.reducer;
