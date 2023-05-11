import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../assets/interfaces/user";
import { getUserData } from "../actions";

const initialState =  {
    user: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
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
        }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
