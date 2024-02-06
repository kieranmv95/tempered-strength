import { configureStore } from "@reduxjs/toolkit";
import userExercisesReducer from "@/lib/features/userExercises/userExercisesSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            exercises: userExercisesReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']