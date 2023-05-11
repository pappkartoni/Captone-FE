import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../interface";
import { allOwnGames, newGameWithImages } from "../actions";

const initialState = {
    games: [] as Game[]
};

export const ownGamesSlice = createSlice({
    name: "ownGames",
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
            builder.addCase(allOwnGames.fulfilled, (state, action) => {
                state.games = action.payload
            })
        }
})

export const {  } = ownGamesSlice.actions;

export default ownGamesSlice.reducer;
