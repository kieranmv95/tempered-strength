import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IUserExercise } from "@/app/api/user/exercises/route";

type UserExercisesState = {
    data: null | IUserExercise[]
}

export const userExercisesSlice = createSlice({
    name: 'userExercises',
    initialState: {
        data: null,
    } as UserExercisesState,
    reducers: {
        fetchSuccess: (state, action: PayloadAction<IUserExercise[]>) => {
            state.data = action.payload
        },
        addSuccess: (state, action: PayloadAction<IUserExercise>) => {
            if(state.data) {
                state.data = [...state.data, action.payload]
            } else {
                state.data = [action.payload]
            }
        },
    },
})

export const { fetchSuccess, addSuccess } = userExercisesSlice.actions
export default userExercisesSlice.reducer