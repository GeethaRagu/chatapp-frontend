import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice';
import conversationuserReducer from './Slice/userConversationSlice';
import messageReducer from './Slice/userMessage';
import searchReducer from './Slice/userSearch';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
const rootReducer = combineReducers({
    user:userReducer,
    conversationuser:conversationuserReducer,
    messageuser:messageReducer,
    searchuser:searchReducer
})
const persistConfig = {
    key:"root",
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store);