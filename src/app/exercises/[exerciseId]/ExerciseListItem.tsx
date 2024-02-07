"use client"

import React, { useState } from "react";
import {IExercise, IUserExercise} from "@/app/api/user/exercises/route";

type ExerciseListItemProps = {
    exercise: IExercise;
    userExercise: IUserExercise;
    deleteExercise: (id: number) => void;
}

const ExerciseListItem = ({ exercise, userExercise, deleteExercise }: ExerciseListItemProps) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div key={exercise.id}  className="grid grid-cols-[1fr_auto] justify-between items-center gap-2">
            <div
                className="bg-zinc-700 px-3 rounded-sm flex justify-between h-11 items-center">
                <p>{new Date(userExercise.date).toLocaleDateString('en-GB')}</p>
                <p className="font-bold">{userExercise.log}kg</p>
            </div>
            <div className="flex gap-2">
                <div
                    onClick={() => setShowOptions(!showOptions)}
                    className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white rounded-sm h-11 w-8 flex items-center justify-center"
                >
                    ...
                </div>
                {showOptions && (
                    <div
                        onClick={() => deleteExercise(userExercise.id)}
                    className="cursor-pointer bg-red-600 hover:bg-red-700-700 text-white rounded-sm h-11 w-11 flex items-center justify-center"
                    >
                        Bin
                    </div>
                )}
        </div>
</div>
)
}

export default ExerciseListItem;