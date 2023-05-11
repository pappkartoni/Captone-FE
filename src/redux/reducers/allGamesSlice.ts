import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../interface";
import { allGames, newGameWithImages } from "../actions";

const initialState = {
    games: [] as Game[]
};

export const allGamesSlice = createSlice({
    name: "allGames",
    initialState,
    reducers: {
/*         setUser: (state, action: PayloadAction<Game>) => {
            console.log("setting user")
            state.games = action.payload;
        }, */
        },
        extraReducers: (builder) => {
            builder.addCase(newGameWithImages.fulfilled, (state, action) => {
                console.log("heres the payload", action.payload)
                if (action.payload) {
                    state.games.push(action.payload)
                }
            })
            builder.addCase(allGames.fulfilled, (state, action) => {
                state.games = action.payload
            })
        }
})

export const {  } = allGamesSlice.actions;

export default allGamesSlice.reducer;
