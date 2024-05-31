"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type File = {
    slug: string
    softwareLabel: string
    description: string | null
    separator: string | null
    maxRows: number | null
    fileFormat: string | null
    label: string | null

}

export const columns: ColumnDef<File>[] = [
    {
        accessorKey: "softwareLabel",
        header: "Logiciel",
    },
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "fileFormat",
        header: "Format de fichier",
    },
    {
        accessorKey: "separator",
        header: "Séparateur",
    },
    {
        accessorKey: "maxRows",
        header: "Nombre maximum de lignes",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const file = row.original
            return (
                <Link href={`/file/${file.slug}/columns`}><ArrowRight /></Link>
            )
        },
    },

]

