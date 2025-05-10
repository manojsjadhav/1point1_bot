import nodeReducer from "./nodeSlice/nodeSlice";
import authReducer from "./nodeSlice/authSlice.ts";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import agentReducer from "./nodeSlice/agentListSlice";
import breadcrumbReducer from "./nodeSlice/breadcrumbSlice.ts";
import contactGroupReducer from "./nodeSlice/getContactGroupSlice.ts";
import createcontactGroupReducer from "./nodeSlice/createcontactGroupSlice.ts";
import contactDetailReducer from "./nodeSlice/getContactDetailsSlice.ts";
import callDetailReducer from "./nodeSlice/getCallHistoryByNumberSlice.ts";
import groupSlice from "./nodeSlice/groupSlice.ts";
import modalSlice from "./nodeSlice/modolNameSlice.ts";
import contactGroupSlice from "./nodeSlice/deleteContactSlice.ts";
import uploadFileReducer from "./nodeSlice/uploadFileSlice.ts";
import uploadCSVFileSlice from "./nodeSlice/uploadCSVFileSlice.ts";
import selectBot from "./nodeSlice/selectBotSlice.ts";

const rootReducer = combineReducers({
  nodes: nodeReducer,
  auth: authReducer,
  agents: agentReducer,
  breadcrumb: breadcrumbReducer,
  groups: contactGroupReducer,
  createGroup: createcontactGroupReducer,
  contactDetails: contactDetailReducer,
  callDetails: callDetailReducer,
  groupSlice: groupSlice,
  modal: modalSlice,
  deleteContacts: contactGroupSlice,
  uploadFile: uploadFileReducer,
  uploadCSVFile: uploadCSVFileSlice,
  selectBot: selectBot,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["nodes", "auth", "agents", "breadcrumb"],
};

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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
