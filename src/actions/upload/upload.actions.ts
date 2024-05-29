"use server";
import { z } from "zod";
import { action } from "@/lib/safe-actions";
import { uploadFileSchema } from "@/src/defintion";
export const uploadFile = action(uploadFileSchema, async ({ email, file }) => {
    console.log("Email:", email, "Password:");
    console.log("File:", file.size)

    // Do something useful here.
});