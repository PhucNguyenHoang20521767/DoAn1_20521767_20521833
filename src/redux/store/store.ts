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
// import storageSession from "redux-persist/lib/storage/session";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth_reducers";
import drawerReducer from "../reducers/drawer_reducers";
import productReducer from "../reducers/product_reducers";
import allProductReducer from "../reducers/allProduct_reducers";
import subCategoryReducer from "../reducers/subCategories";
import googleReducer from "../reducers/google_reducer";
import cartReducer from "../reducers/cart_reducers";
import cartItemReducer from "../reducers/cartItem_reducers";
import orderReducer from "../reducers/order_reducers";
import notifyReducer from "../reducers/notify_reducers";
import discountReducer from "../reducers/discount_reducers";
import searchReducer from "../reducers/search_reducers";
import conversationReducer from "../reducers/conversation_reducers";

// Define your root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
  product: productReducer,
  all: allProductReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
  sub: subCategoryReducer,
  order: orderReducer,
  notify: notifyReducer,
  search: searchReducer,
  discount: discountReducer,
  conversation: conversationReducer,
});

// Define your persist config
const persistConfig = {
  key: "root",
  version: 1.1,
  storage: storage,
};

// Define your persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define your store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Get RootState and AppDispatch from store
export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

// persistor
//   .purge()
//   .then(() => {
//     console.log("Data reset successful");
//   })
//   .catch(() => {
//     console.log("Data reset failed");
//   });
