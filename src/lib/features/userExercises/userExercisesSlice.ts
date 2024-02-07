import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserExercise } from "@/app/api/user/exercises/route";

type UserExercisesState = {
    data: null | IUserExercise[],
    loading: null | boolean,
    err: string;
}

export const fetchUserExercises = createAsyncThunk(
    'userExercises/fetch',
    async ( thunkAPI) => {
        const res = await fetch('/api/user/exercises');
        const data = await res.json();
        return data;
    },
)

export const userExercisesSlice = createSlice({
    name: 'userExercises',
    initialState: {
        data: null,
        loading: null,
        err: "",
    } as UserExercisesState,
    reducers: {
        addSuccess: (state, action: PayloadAction<IUserExercise>) => {
            if(state.data) {
                state.data = [...state.data, action.payload]
            } else {
                state.data = [action.payload]
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserExercises.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.err = "Error loading user exercises";
        });
        builder.addCase(fetchUserExercises.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUserExercises.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.err = "";
        });
    }
})

export const { addSuccess } = userExercisesSlice.actions
export default userExercisesSlice.reducer