"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
export type ProjectColumn = {
    fileSlug: string
    projectSlug: string
    slug: string
    columnLabel: string | null
    type: string | null
    standardFieldLabel: string | null
    defaultValue: string | null
    isRequired: boolean | null
    order: number | null
}

import AlertDeleteTransco from "@/components/AlertDeleteTransco"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<ProjectColumn>[] = [
    {
        accessorKey: "columnLabel",
        header: "Libellé de la colonne",
    },
    {
        accessorKey: "type",
        header: "Type de valeur",
        cell: ({ row }) => {
            const column = row.original
            return (column.type === 'string' ? 'Texte' : column.type === 'number' ? 'Nombre' : column.type === 'date' ? 'Date' : 'Inconnu')
        }
    },
    {
        accessorKey: "isRequired",
        header: "Champ obligatoire",
        cell: ({ row }) => {
            return (<Badge variant={row.original.isRequired ? "default" : "secondary"}>{row.original.isRequired ? "Oui" : "Non"}</Badge>)
        }
    },
    {
        accessorKey: "standardFieldLabel",
        header: "Champ source",
    },
    {
        accessorKey: "defaultValue",
        header: "Valeur par default",
    },
    {
        accessorKey: "order",
        header: "Numéro d'ordre",
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/param/${row.original.fileSlug}/column/${row.original.slug}/edit`}>
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

