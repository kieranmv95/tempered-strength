'use client';

import Link from 'next/link';
import useUserExercises from '@/hooks/useUserExercises';

const Exercises = () => {
  const { data, loading, err } = useUserExercises();

  return <></>;
};

export default Exercises;
