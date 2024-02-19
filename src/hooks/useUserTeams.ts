import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUserTeams } from "@/lib/features/userTeams/userTeamsSlice";

const useUserTeams = () => {
  const dispatch = useAppDispatch();
  const { data, loading, err } = useAppSelector((state) => state.userTeams);

  useEffect(() => {
    if (!data && !err && !loading) {
      dispatch(fetchUserTeams());
    }
  }, [data, err, loading, dispatch]);

  return { data, loading, err };
};

export default useUserTeams;
