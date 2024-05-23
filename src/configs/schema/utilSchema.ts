import { z } from "zod";
import { BANK_ACCOUNT, BSB_COUNT } from "../utils/literals";

export const phoneSchema = z
    .union([
        z.string().trim().min(3, { message: "Phone number is too short" }),
        z.string().length(0),
    ])
    .default("");

export const emailSchema = z
    .union([z.string().email().trim().toLowerCase(), z.string().length(0)])
    .default("");

export const postSchema = z
    .string()
    //match 4 digits string which may start with 0
    .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
    .min(4)
    .max(4)
    .nullable()
    .default("5000");

export const bsbSchema = z
    .union([z.string().length(BSB_COUNT), z.string().length(0)])
    .default("");

// bank account
export const baSchema = z
    .union([z.string().length(BANK_ACCOUNT), z.string().length(0)])
    .default("");
