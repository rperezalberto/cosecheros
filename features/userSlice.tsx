import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userData } from '../data/data';

import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import { UserIterface } from "../interfaces/userInterfaces";

import * as ImagePicker from 'expo-image-picker';

interface UserState {
    userData: typeof userData;
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
        },


        add: (state, action: PayloadAction<UserIterface>) => {
            state.isLoading = true;
            addCity(action.payload);
            state.img = "";
            state.isLoading = false;
        },

        addImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        }
    },
});



const addCity = async (user: UserIterface) => {
    try {
        await setDoc(doc(collection(db, 'users'), user.id), {
            id: user.id,
            name: user.name,
            birthdate: user.birthdate,
            province: user.province,
            img: user.img,
        });
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
