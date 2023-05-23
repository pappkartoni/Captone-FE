import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { editUserData, getUserData } from "../actions";
import { User } from "../interface";

const initialState =  {
    user: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
        trades: 0,
    } as User
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            console.log("setting user")
            state.user = action.payload;
        },
        clearUser: (state, action) => {
            state = initialState
        }
        },
        extraReducers: (builder) => {
            builder.addCase(getUserData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload
            })
            builder.addCase(editUserData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload
            })
        }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
