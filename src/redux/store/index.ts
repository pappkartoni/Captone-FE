import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {persistReducer, persistStore} from "redux-persist"
import userReducer from "../reducers/userSlice"
import owngamesReducer from "../reducers/ownGamesSlice"
import allGamesReducer from "../reducers/allGamesSlice"
import allUsersReducer from "../reducers/allUsersSlice"
import offersReducer from "../reducers/offersSlice"
import localStorage from "redux-persist/es/storage"

const persistConfig = {
    storage: localStorage,
    key: "root"
}

const combinedReducer = combineReducers({
    user: userReducer,
    ownGames: owngamesReducer,
    allGames: allGamesReducer,
    offers: offersReducer,
    users: allUsersReducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)
const store = configureStore({
    reducer: persistedReducer
})

const persistedStore = persistStore(store)


export {store, persistedStore}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch