import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userData } from '../data/data';
import uuid from 'react-native-uuid';




interface UserState {
    userData: typeof userData;
    lastName: string;
}

const initialState: UserState = {
    userData,
    lastName: "Robin"
};

export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<typeof userData>) => {
            state.userData = action.payload;
        },

        add: (state, action: PayloadAction<string>) => {

            // console.log("jajaja");
            console.log("Hola", action.payload);
            state.userData.push({
                id: uuid.v4() as string,
                name: action.payload,
                email: "newuser@example.com",
                // birthdate: new Date().toISOString(),
                img: "https://images.ecestaticos.com/0NSU6CTpIsbkQSi6hjq36RSdxTo=/0x0:0x0/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F769%2Ff6d%2Fe65%2F769f6de657b8d14f063b2c640a863474.jpg",
            });
        }
    },
});

// Exporta las acciones generadas
export const { setUserData, add } = userSlice.actions;

// Exporta el reducer generado
export default userSlice.reducer;
