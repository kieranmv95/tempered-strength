import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITeam } from '@/types/ITeam';
import { deleteTeam } from '@/lib/features/userTeams/userTeamsSlice';
import { logout } from '@/lib/store';

type TeamsState = {
  data: null | ITeam[];
  loading: null | boolean;
  err: string;
};

export const fetchTeams = createAsyncThunk('teams/fetch', async () => {
  const res = await fetch('/api/teams', { cache: 'no-cache' });
  return await res.json();
});

const initialState: TeamsState = {
  data: null,
  loading: null,
  err: '',
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTeams.rejected, (state, _) => {
      state.loading = false;
      state.data = [];
      state.err = 'Error loading teams';
    });
    builder.addCase(fetchTeams.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = '';
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      if (!action.payload.err) {
        const currentData = state.data ? state.data : [];
        state.data = currentData.filter(
          t => t.id !== Number(action.payload.id),
        );
      }
    });
    builder.addCase(logout, () => initialState);
  },
});

export default teamsSlice.reducer;
