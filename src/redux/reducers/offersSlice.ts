import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sentOffers, recievedOffers } from "../actions";
import { Offer } from "../interface";

const initialState =  {
    sent: [] as Offer[],
    recieved: [] as Offer[]
};

export const userSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        addSentOffer: (state, action: PayloadAction<Offer>) => {
            console.log("add sent offer")
            state.sent.push(action.payload)
        },
        deleteSentOffer: (state, action: PayloadAction<Offer>) => {
            state.sent.filter(o => o._id !== action.payload._id)
        }
        },
        extraReducers: (builder) => {
            builder.addCase(sentOffers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.sent = action.payload
            })
            builder.addCase(recievedOffers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.recieved = action.payload
            })
        }
})

export const { addSentOffer, deleteSentOffer } = userSlice.actions;

export default userSlice.reducer;
