"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
export type Email = {
    projectSlug: string
    slug: string
    domain: string | null
    type: string | null

}

import AlertDeleteTransco from "@/components/AlertDeleteTransco"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Email>[] = [
    {
        accessorKey: "domain",
        header: "Nom de domaine",
    },
    {
        header: "Type de domaine",
        cell: ({ row }) => {
            return (
                <Badge>{row.original.type}</Badge>
            )
        }
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/transco/edit/domainEmail/${row.original.slug}/`}>
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

