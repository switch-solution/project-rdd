"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Row = {
    slug: string
    order: number
    value: string | null


}

export const columns: ColumnDef<Row>[] = [
    {
        accessorKey: "order",
        header: "Ordre",
    },
    {
        accessorKey: "value",
        header: "Valeur",
    },


]

