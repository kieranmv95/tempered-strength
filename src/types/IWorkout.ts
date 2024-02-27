export type IWorkoutLoggingType = 'weight' | 'reps' | 'duration';
export type IWorkoutType = 'CrossFit' | 'Hyrox';

export type IWorkout = {
  id: number;
  description: string;
  name: string;
  logging_type: IWorkoutLoggingType;
  workout_type: IWorkoutType;
};

export type IUserWorkout = {
  id: number;
  userId: string;
  workoutId: number;
  date: string;
  log: string;
};
