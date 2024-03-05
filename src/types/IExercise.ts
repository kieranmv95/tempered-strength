export type ILoggingType = 'weight' | 'reps' | 'duration';
export type IExerciseType =
  | 'Cardio'
  | 'Lifting'
  | 'Olympic Lifting'
  | 'Bodyweight'
  | 'Calisthenics';

export type IExercise = {
  id: number;
  name: string;
  logging_type: ILoggingType;
  public: number;
  exercise_type: IExerciseType;
};

export type IUserExercise = {
  id: number;
  userId: string;
  exerciseId: number;
  log?: number;
  date: string;
  duration?: string;
};
