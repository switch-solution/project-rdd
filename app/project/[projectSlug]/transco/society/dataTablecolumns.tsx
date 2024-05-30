"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, Pencil, Trash } from "lucide-react"
import Link from "next/link"
export type Society = {
    projectSlug: string
    slug: string
    siren: string | null
    newId: string | null

}
import AlertDeleteTransco from "@/components/AlertDeleteTransco"

export const columns: ColumnDef<Society>[] = [
    {
        accessorKey: "siren",
        header: "SIREN",
    },
    {
        accessorKey: "newId",
        header: "Code société",
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/transco/edit/society/${row.original.slug}/`}>
                    <Pencil />
                </Link>
            )
        }
    },
    {
        header: "Supprimer",
        id: 'delete',
        cell: ({ row }) => {
            return (
                <AlertDeleteTransco projectSlug={row.original.projectSlug} transcoSlug={row.original.slug} type="society" />
            )
        }
    },


]

