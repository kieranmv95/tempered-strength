import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTeams } from '@/lib/features/teams/teamsSlice';

const useTeams = () => {
  const dispatch = useAppDispatch();
  const { data, loading, err } = useAppSelector(state => state.teams);

  useEffect(() => {
    if (!data && !err && !loading) {
      dispatch(fetchTeams());
    }
  }, [data, err, loading, dispatch]);

  const refreshTeams = () => {
    dispatch(fetchTeams());
  };

  return { data, loading, err, refreshTeams };
};

export default useTeams;
