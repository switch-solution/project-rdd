"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, Pencil, Trash } from "lucide-react"
import AlertDeleteTransco from "@/components/AlertDeleteTransco"
import Link from "next/link"
export type Person = {
    projectSlug: string
    slug: string
    firstname: string | null
    lastname: string | null
    oldId: string | null
    numSS: string | null
    siret: string | null
    newId: string | null

}

export const columns: ColumnDef<Person>[] = [
    {
        accessorKey: "siret",
        header: "SIRET",
    },
    {
        accessorKey: "numSS",
        header: "Numéro de sécurité sociale",
    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "firstname",
        header: "Prénom",
    },
    {
        accessorKey: "oldId",
        header: "Ancien matricule",
    },
    {
        accessorKey: "newId",
        header: "Nouveaux matricule",
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/transco/edit/person/${row.original.slug}/`}>
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
                <AlertDeleteTransco projectSlug={row.original.projectSlug} transcoSlug={row.original.slug} type='person' />
            )
        },

    }

]

