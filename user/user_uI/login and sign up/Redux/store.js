import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import stationReducer from "./features/stations/stationSlice";
import mapReducer from "./features/mapdata/mapSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
// import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage, // Use AsyncStorage as the storage engine
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  stations: stationReducer,
  map: mapReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
