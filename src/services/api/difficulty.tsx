import { z } from "zod"

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}

export const DifficultySchema = z.nativeEnum(Difficulty)