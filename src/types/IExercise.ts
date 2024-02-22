export type ILoggingType = 'weight' | 'reps' | 'duration';

export type IExercise = {
  id: number;
  name: string;
  logging_type: ILoggingType;
  public: number;
};

export type IUserExercise = {
  id: number;
  userId: string;
  exerciseId: number;
  log?: number;
  date: string;
  duration?: string;
};
