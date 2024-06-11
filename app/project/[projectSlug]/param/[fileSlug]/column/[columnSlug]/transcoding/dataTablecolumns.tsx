"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
export type ProjectColumnTranscoding = {
    projectSlug: string
    columnSlug: string
    sourceValue: string | null
    targetValue: string | null
}

import AlertDeleteTransco from "@/components/AlertDeleteTransco"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<ProjectColumnTranscoding>[] = [

    {
        accessorKey: "sourceValue",
        header: "Valeur source",
    },
    {
        accessorKey: "targetValue",
        header: "Valeur de destination",
    },




]

