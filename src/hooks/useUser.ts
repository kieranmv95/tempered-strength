import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUser } from '@/lib/features/user/userSlice';

const useUser = () => {
  const dispatch = useAppDispatch();
  const { data, loading, err } = useAppSelector(state => state.user);

  useEffect(() => {
    if (!data && !err && !loading) {
      dispatch(fetchUser());
    }
  }, [data, err, loading, dispatch]);

  return { data, loading, err };
};

export default useUser;
