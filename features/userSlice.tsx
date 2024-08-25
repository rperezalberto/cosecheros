import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";
import { db, storageCon } from "../firebase/firebaseConfig";
import { UserIterface } from "../interfaces/userInterfaces";

interface UserState {
    userData: UserIterface[];
    isLoading: boolean;
    img: string;
}

const initialState: UserState = {
    userData: [],
    isLoading: false,
    img: "",
};

export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserIterface[]>) => {
            state.userData = action.payload;
            saveDataToAsyncStorage(state.userData);
        },

        updateUserData: (state, action: PayloadAction<UserIterface[]>) => {
            state.userData = action.payload;
        },

        add: (state, action: PayloadAction<UserIterface>) => {
            state.isLoading = true;
            state.userData.push(action.payload);
            addCity(action.payload);
            saveDataToAsyncStorage(state.userData);
            state.img = "";
            state.isLoading = false;
        },

        addImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },

        deleteItem: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const itemIndex = state.userData.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                const itemToDelete = state.userData[itemIndex];
                state.userData.splice(itemIndex, 1);
                saveDataToAsyncStorage(state.userData);

                deleteCity(itemToDelete.id);
                if (itemToDelete.img) {
                    deleteImage(itemToDelete.img);
                }
            }
        }
    },
});
const addCity = async (user: UserIterface) => {
    try {
        await setDoc(doc(collection(db, 'users'), user.id), user);
    } catch (error) {
        console.error('Error writing document: ', error);
        throw error;
    }
}

const saveDataToAsyncStorage = async (userData: UserIterface[]) => {
    try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem('@user_data', jsonValue);
        console.log('userData guardado en AsyncStorage');
    } catch (error) {
        console.error('Error guardando userData en AsyncStorage', error);
    }
}

export const loadUserDataFromAsyncStorage = async (dispatch: any) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_data');
        if (jsonValue != null) {
            const storedUserData = JSON.parse(jsonValue) as UserIterface[];
            dispatch(setUserData(storedUserData));
        }
    } catch (error) {
        console.error('Error al cargar datos desde AsyncStorage', error);
    }
}

const deleteCity = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'users', id));
    } catch (error) {
        console.error('Error al eliminar el documento: ', error);
    }
}

const deleteImage = async (imgPath: string) => {
    try {
        let pathToDelete = imgPath;

        if (imgPath.startsWith('https://')) {
            const url = new URL(imgPath);
            const pathname = url.pathname;
            pathToDelete = decodeURIComponent(pathname.split('/o/')[1]);
        }

        const imageRef = ref(storageCon, pathToDelete);
        await deleteObject(imageRef);
    } catch (error) {
        console.error('Error al eliminar la imagen: ', error);
    }
}


export const { setUserData, updateUserData, add, addImg, deleteItem } = userSlice.actions;
export default userSlice.reducer;
