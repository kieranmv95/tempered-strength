export type IWorkoutLoggingType = 'weight' | 'reps' | 'duration' | '24.1';

export type IWorkoutType = 'CrossFit' | 'Hyrox' | 'CrossFit Open';

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
