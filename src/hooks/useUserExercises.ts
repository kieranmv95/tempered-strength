import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUserExercises } from '@/lib/features/userExercises/userExercisesSlice';
import { sortByDate } from '@/helpers/arrayHelpers';

const useUserExercises = () => {
  const dispatch = useAppDispatch();
  const { data, loading, err } = useAppSelector(state => state.exercises);

  useEffect(() => {
    if (!data && !err && !loading) {
      dispatch(fetchUserExercises());
    }
  }, [data, err, loading, dispatch]);

  const getOneRepMax = (exerciseId: number): number | null => {
    const oneRepMax = data
      ?.filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
      .reduce(
        (prev, curr) =>
          (curr.log as number) > prev ? (curr.log as number) : prev,
        0,
      );

    return oneRepMax ? oneRepMax : null;
  };

  const getFastestTime = (exerciseId: number): string | null => {
    const exercises = data?.filter(
      userExercise => Number(userExercise.exerciseId) === exerciseId,
    );

    if (!exercises || exercises.length === 0) {
      return null;
    }

    const exercisesWithDurationInSeconds = exercises.map(exercise => ({
      ...exercise,
      durationInSeconds: (exercise.duration as string)
        .split(':')
        .reduce((acc, time) => 60 * acc + +time, 0),
    }));

    const fastestExercise = exercisesWithDurationInSeconds.reduce(
      (minExercise, currentExercise) => {
        return currentExercise.durationInSeconds < minExercise.durationInSeconds
          ? currentExercise
          : minExercise;
      },
      exercisesWithDurationInSeconds[0],
    );

    return fastestExercise.duration ? fastestExercise.duration : null;
  };

  const getExerciseById = (exerciseId: number) => {
    const oneRepMax = data
      ?.filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
      .sort(sortByDate);

    return oneRepMax ? oneRepMax : [];
  };

  return { data, loading, err, getOneRepMax, getExerciseById, getFastestTime };
};

export default useUserExercises;
