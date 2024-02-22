import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserTeam } from '@/types/ITeam';

type TeamsState = {
  data: null | IUserTeam[];
  loading: null | boolean;
  err: string;
};

export const fetchUserTeams = createAsyncThunk('userTeams/fetch', async () => {
  const res = await fetch('/api/user/teams', { cache: 'no-cache' });
  return await res.json();
});

export const joinTeam = createAsyncThunk(
  'userTeams/join',
  async ({ password, team }: { password: string; team: string }) => {
    const res = await fetch('/api/teams/join', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({
        password,
        team,
      }),
    });

    return await res.json();
  },
);

export const deleteTeam = createAsyncThunk(
  'userTeams/delete',
  async ({ id }: { id: string }) => {
    const res = await fetch('/api/teams/delete', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({
        id,
      }),
    });

    return await res.json();
  },
);

export const createTeam = createAsyncThunk(
  'userTeams/create',
  async ({
    password,
    name,
    description,
  }: {
    password: string;
    description: string;
    name: string;
  }) => {
    const res = await fetch('/api/teams', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({
        password,
        name,
        description,
      }),
    });

    return await res.json();
  },
);

export const userTeamsSlice = createSlice({
  name: 'userTeams',
  initialState: {
    data: null,
    loading: null,
    err: '',
  } as TeamsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserTeams.rejected, (state, _) => {
      state.loading = false;
      state.data = [];
      state.err = 'Error loading user teams';
    });
    builder.addCase(fetchUserTeams.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchUserTeams.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = '';
    });
    builder.addCase(joinTeam.fulfilled, (state, action) => {
      const currentData = state.data ? state.data : [];
      if (action.payload.err) {
        state.data = [...currentData];
      } else {
        state.data = [...currentData, action.payload];
      }
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      const currentData = state.data ? state.data : [];
      if (action.payload.err) {
        state.data = [...currentData];
      } else {
        state.data = [...currentData, action.payload];
      }
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      if (!action.payload.err) {
        const currentData = state.data ? state.data : [];
        state.data = currentData.filter(
          t => t.id !== Number(action.payload.id),
        );
      }
    });
  },
});

export default userTeamsSlice.reducer;
