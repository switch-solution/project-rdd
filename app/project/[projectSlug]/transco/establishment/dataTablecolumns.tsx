"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
export type Establishment = {
    projectSlug: string
    slug: string
    siren: string | null
    nic: string | null
    newId: string | null

}

import AlertDeleteTransco from "@/components/AlertDeleteTransco"

export const columns: ColumnDef<Establishment>[] = [
    {
        accessorKey: "siren",
        header: "SIREN",
    },
    {
        accessorKey: "nic",
        header: "NIC",
    },
    {
        accessorKey: "newId",
        header: "Code établissement",
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/transco/edit/establishment/${row.original.slug}/`}>
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
                <AlertDeleteTransco projectSlug={row.original.projectSlug} transcoSlug={row.original.slug} type='establishment' />
            )
        },

    }


]

