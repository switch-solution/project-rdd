"use client"

import { ColumnDef } from "@tanstack/react-table"
import ButtonStartMigration from "@/components/button/ButtonStartMigration"
export type Extraction = {
    projectSlug: string
    extractionSlug: string
    projectFileSlug: string
    fileLabel: string | null
    status: string | null
    countValue: number | null
    iteratorLabel: string
    idList: string[]

}

export const columns: ColumnDef<Extraction>[] = [
    {
        accessorKey: "fileLabel",
        header: "Libellé fichier",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "iteratorLabel",
        header: "Itération",
    },
    {
        id: "countTransco",
        header: "Nombre de ligne à traiter",
        cell: ({ row }) => {
            return (
                <span>{row.original.idList.length}</span>
            )
        }
    },
    {
        accessorKey: "countValue",
        header: "Nombre d'enregistrement traité",
    },
    {
        header: "Générer",
        id: 'process',
        cell: ({ row }) => {
            return (
                <ButtonStartMigration
                    projectSlug={row.original.projectSlug}
                    extractionSlug={row.original.extractionSlug}
                    projectFileSlug={row.original.projectFileSlug}
                    idList={row.original.idList}
                />
            )
        }
    },


]

