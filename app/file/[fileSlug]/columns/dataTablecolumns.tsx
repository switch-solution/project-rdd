"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export type File = {
    fileSlug: string
    standardFieldLabel: string | null,
    slug: string
    softwareLabel: string
    description: string | null
    label: string | null
    type: string | null


}

export const columns: ColumnDef<File>[] = [
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "standardFieldLabel",
        header: "Champ standard",
    },
    {
        accessorKey: "type",
        header: "Type",
    },

    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const column = row.original
            return (
                <Link href={`/file/${column.fileSlug}/columns/${column.slug}/edit`}><ArrowRight /></Link>
            )
        },
    },

]

