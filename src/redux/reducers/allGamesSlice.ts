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
        updateGame: (state, action: PayloadAction<Game>) => {
            const i = state.games.findIndex(g => g._id === action.payload._id)
            if (i !== -1)
            state.games = [...state.games.slice(0, i), action.payload, ...state.games.slice(i + 1)]
        }

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

export const {updateGame} = allGamesSlice.actions;

export default allGamesSlice.reducer;
