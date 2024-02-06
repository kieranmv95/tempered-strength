import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSuccess } from "@/lib/features/userExercises/userExercisesSlice";

const useUserExercises = () => {
    const dispatch = useAppDispatch();
    const userExercises = useAppSelector((state) => state.exercises.data);

    useEffect(() => {
        (async () => {
            if(!userExercises) {
                const res = await fetch('/api/user/exercises');
                const json = await res.json();

                dispatch(fetchSuccess(json))
            }
        })();
    }, [userExercises, dispatch]);

    const getExercisesById = (id: number) => {
        return userExercises?.filter((exercise) => exercise.id === id);
    }

    return { userExercises, getExercisesById };
}

export default useUserExercises;