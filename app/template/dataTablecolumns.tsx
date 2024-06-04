"use client"

import { ColumnDef } from "@tanstack/react-table"
import ButttonExportTemplate from "@/components/button/ButtonExportTemplate"
export type Template = {
    slug: string
    label: string
    description: string | null

}

export const columns: ColumnDef<Template>[] = [
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "description",
        header: "description",
    },
    {
        id: "export",
        header: "Exporter",
        cell: ({ row }) => {
            const template = row.original
            return (
                <ButttonExportTemplate templateSlug={template.slug} fileLabel={template.label} />

            )
        },
    },

]

