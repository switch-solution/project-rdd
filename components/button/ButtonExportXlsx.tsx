"use client";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import XLSX from "xlsx";

export function ButtonExportXlsx({ data, fileLabel }: { data: { [key: string]: string }[], fileLabel: string }) {
    const handleClick = async () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${fileLabel}`);
        XLSX.writeFile(wb, `${fileLabel}.xlsx`);
    }

    return (
        <div className="gap-4  px-4">
            <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
                onClick={handleClick}
            >
                <File className="size-3.5" />
                <span className="sr-only sm:not-sr-only sm:hidden">Exporter au format Excel</span>
            </Button>
        </div>

    )


}