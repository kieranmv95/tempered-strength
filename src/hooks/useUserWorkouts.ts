import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUserWorkouts } from '@/lib/features/userWorkouts/userWorkoutsSlice';

const useUserWorkouts = () => {
  const dispatch = useAppDispatch();
  const { data, loading, err } = useAppSelector(state => state.userWorkouts);

  useEffect(() => {
    if (!data && !err && !loading) {
      dispatch(fetchUserWorkouts());
    }
  }, [data, err, loading, dispatch]);

  const getOneRepMax = (workoutId: number) => {
    const oneRepMax = data
      ?.filter(userWorkout => Number(userWorkout.workoutId) === workoutId)
      .reduce(
        (prev, curr) =>
          (curr.log as unknown as number) > prev
            ? (curr.log as unknown as number)
            : prev,
        0,
      );

    return oneRepMax ? oneRepMax : null;
  };

  const getFastestTime = (workoutId: number) => {
    const workouts = data?.filter(
      userWorkout => Number(userWorkout.workoutId) === workoutId,
    );

    if (!workouts || workouts.length === 0) {
      return null;
    }

    const workoutsWithDurationInSeconds = workouts.map(workout => ({
      ...workout,
      durationInSeconds: workout.log
        .split(':')
        .reduce((acc, time) => 60 * acc + +time, 0),
    }));

    const fastestWorkout = workoutsWithDurationInSeconds.reduce(
      (minWorkout, currentWorkout) => {
        return currentWorkout.durationInSeconds < minWorkout.durationInSeconds
          ? currentWorkout
          : minWorkout;
      },
      workoutsWithDurationInSeconds[0],
    );

    return fastestWorkout.log;
  };

  const getWorkoutById = (workoutId: number) => {
    const oneRepMax = data
      ?.filter(userWorkout => Number(userWorkout.workoutId) === workoutId)
      .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    return oneRepMax ? oneRepMax : [];
  };

  return { data, loading, err, getOneRepMax, getFastestTime, getWorkoutById };
};

export default useUserWorkouts;
