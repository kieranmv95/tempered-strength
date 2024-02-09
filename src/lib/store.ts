import { configureStore } from "@reduxjs/toolkit";
import userExercisesReducer from "@/lib/features/userExercises/userExercisesSlice";
import userReducer from "@/lib/features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      exercises: userExercisesReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
