import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./features/admin/adminSlice";
import modalReducer from "./features/modal/modalSlice";
import componentReducer from "./features/comp_inside_homepage/componentSlice";
import userReducer from "./features/users/usersSlice";
import otpReducer from "./features/otp/OtpSlice";
import userStatsReducer from "./features/userStats/userStatsSlice";
import revenueReducer from "./features/paymentsStats/paymentSlice";

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

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["admin"],
};

const rootReducer = combineReducers({
  admin: adminReducer,
  modal: modalReducer,
  component: componentReducer,
  users: userReducer,
  otp: otpReducer,
  userStats: userStatsReducer,
  paymentStats: revenueReducer,
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
