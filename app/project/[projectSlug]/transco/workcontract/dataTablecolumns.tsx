"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
import AlertDeleteTransco from "@/components/AlertDeleteTransco"

export type WorkContract = {
    projectSlug: string
    slug: string
    numSS: string
    siret: string | null
    employeeId: string | null
    lastname: string | null
    firstname: string | null
    contractId: string | null
    newId: string | null

}

export const columns: ColumnDef<WorkContract>[] = [
    {
        accessorKey: "siret",
        header: "SIRET",
    },
    {
        accessorKey: "numSS",
        header: "Numéro de sécurité sociale",
    },
    {
        accessorKey: "employeeId",
        header: "Matricule salarié",
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
        accessorKey: "contractId",
        header: "Numéro de contrat DSN",
    },
    {
        accessorKey: "newId",
        header: "Nouveau numéro de contrat interne",
    },
    {
        header: "Editer",
        id: 'edit',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/transco/edit/workcontract/${row.original.slug}/`}>
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
                <AlertDeleteTransco projectSlug={row.original.projectSlug} transcoSlug={row.original.slug} type='workcontract' />
            )
        }
    },



]

