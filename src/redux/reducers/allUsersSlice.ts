import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interface";
import { getAllUsers } from "../actions";

const initialState = {
    users: [] as User[]
};

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
/*         setUser: (state, action: PayloadAction<Game>) => {
            console.log("setting user")
            state.games = action.payload;
        }, */
        },
        extraReducers: (builder) => {
            builder.addCase(getAllUsers.fulfilled, (state, action: any) => {
                console.log("heres the payload", action.payload)
                if (action.payload) {
                    state.users = action.payload
                }
            })
        }
})

export const {  } = allUsersSlice.actions;

export default allUsersSlice.reducer;
