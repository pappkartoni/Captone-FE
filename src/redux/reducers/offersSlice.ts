import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sentOffers, recievedOffers, acceptOffer, declineOffer, makeOffer } from "../actions";
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
            builder.addCase(makeOffer.fulfilled, (state, action) => {
                console.log(action.payload)
                state.sent = [...state.sent, action.payload]
            })
            builder.addCase(sentOffers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.sent = action.payload
            })
            builder.addCase(recievedOffers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.recieved = action.payload
            })
            builder.addCase(acceptOffer.fulfilled, (state, action) => {
                const i = state.recieved.findIndex(o => o._id === action.payload._id)
                state.recieved[i] = action.payload
            })
            builder.addCase(declineOffer.fulfilled, (state, action) => {
                const i = state.recieved.findIndex(o => o._id === action.payload._id)
                if (i === -1) {
                    const j = state.sent.findIndex(o => o._id === action.payload._id)
                    state.sent[j] = action.payload
                } else {
                    state.recieved[i] = action.payload
                }
            })
        }
})

export const { addSentOffer, deleteSentOffer } = userSlice.actions;

export default userSlice.reducer;
