"use client"

import { ColumnDef } from "@tanstack/react-table"
import ButtonStartMigration from "@/components/button/ButtonStartMigration"
import Link from "next/link"
import type { IdListPerson, IdListSociety, IdListWorkContract, } from "@/src/helpers/type";
import type { IteratorLabel } from "@/src/helpers/typeTransco";

export type Extraction = {
    projectSlug: string
    extractionSlug: string
    projectFileSlug: string
    fileLabel: string
    status: string | null
    iteratorLabel: string
    idList: IdListPerson[] | IdListSociety[] | IdListWorkContract[]
    extractionFileSlug: string
    countRows: number

}

export const columns: ColumnDef<Extraction>[] = [
    {
        accessorKey: "fileLabel",
        header: "Libellé fichier",
    },
    {
        accessorKey: "iteratorLabel",
        header: "Itération",
    },
    {
        accessorKey: "status",
        header: "Status",
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
        id: "countRows",
        header: "Nombre de lignes traitées",
        cell: ({ row }) => {
            return (
                <span>{row.original.countRows}</span>
            )
        }
    },
    {
        header: "Générer",
        id: 'process',
        cell: ({ row }) => {
            return (
                <ButtonStartMigration
                    key={row.original.projectFileSlug}
                    projectSlug={row.original.projectSlug}
                    extractionSlug={row.original.extractionSlug}
                    projectFileSlug={row.original.projectFileSlug}
                    idList={row.original.idList}
                    iteratorLabel={row.original.iteratorLabel as IteratorLabel}
                    status={row.original.status as 'En attente' | 'Terminé'}
                />
            )
        }
    },
    {
        header: "Exporter au format Excel",
        id: 'excel',
        cell: ({ row }) => {
            return (
                <Link href={`/project/${row.original.projectSlug}/extraction/${row.original.extractionSlug}/data/${row.original.extractionFileSlug}`}>Excel</Link>
            )
        }
    }


]

