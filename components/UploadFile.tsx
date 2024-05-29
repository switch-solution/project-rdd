"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { uploadFileSchema } from "@/src/defintion";
import { uploadFile } from "@/src/actions/upload/upload.actions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
export const UploadFile = () => {

    return (
        <form action={uploadFile}>
            <Input type="type" name="text" placeholder="name@example.com" />
            <Input type="file" name="file" multiple />
            <button type="submit">Signup</button>
        </form>

    )

}