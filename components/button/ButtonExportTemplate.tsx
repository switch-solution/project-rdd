"use client";
import XLSX from "xlsx";
import { createTemplate } from "@/src/actions/template/template.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Download } from "lucide-react";
export default function ButttonExportTemplate({ templateSlug, fileLabel }: { templateSlug: string, fileLabel: string }) {

    const handleClick = async () => {
        const action = await createTemplate({ templateSlug })
        if (action.serverError || !action.data) {
            toast.error(`Oups une erreur est survenue`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } else {
            const ws = XLSX.utils.json_to_sheet(action?.data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, `${fileLabel}`);
            XLSX.writeFile(wb, `${fileLabel}.xlsx`);
        }

    }
    return (
        <Button onClick={handleClick}>
            <Download />
        </Button>
    )

}