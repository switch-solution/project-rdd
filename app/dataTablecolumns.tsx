"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight } from "lucide-react"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
export type Project = {
    slug: string | null
    label: string | null
    description: string | null

}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        accessorKey: "status",
        header: "status",
    },
    {
        id: "open",
        header: "Ouvrir",
        cell: ({ row }) => {
            const project = row.original
            return (
                <Link href={`/project/${project.slug}`}><ArrowRight /></Link>
            )
        },
    },

]

