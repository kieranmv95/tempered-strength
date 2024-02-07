import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUserExercises } from "@/lib/features/userExercises/userExercisesSlice";

const useUserExercises = () => {
    const dispatch = useAppDispatch();
    const { data, loading, err} = useAppSelector((state) => state.exercises);

    useEffect(() => {
        if(!data && !err && !loading) {
            dispatch(fetchUserExercises())
        }
    }, [data, err, loading, dispatch]);

    const getOneRepMax = (exerciseId: number) => {
        const oneRepMax = data
            ?.filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
            .reduce((prev, curr) => Number(curr.log) > prev ? Number(curr.log) : prev, 0);

        return oneRepMax ? oneRepMax : null;
    }

    const getExerciseById = (exerciseId: number) => {
        const oneRepMax = data
            ?.filter(userExercise => Number(userExercise.exerciseId) === exerciseId)
            .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())

        return oneRepMax ? oneRepMax : [];
    }

    return { data, loading, err, getOneRepMax, getExerciseById };
}

export default useUserExercises;
