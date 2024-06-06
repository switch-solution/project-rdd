"use client";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import XLSX from "xlsx";
import { createTemplateChildren, createTemplatePersonBank } from "@/src/actions/template/template.actions";

export default function UploadFileTemplate({ projectSlug, templateSlug }: { projectSlug: string, templateSlug: 'rib_salaries' | 'enfants' }) {
    const [loading, setLoading] = useState(false)

    const readExcelFile = (file: File): Promise<XLSX.WorkBook> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const data = new Uint8Array(event.target.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    resolve(workbook);
                } else {
                    reject(new Error("Event target is null"));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const fileInputElement = (e.target as HTMLFormElement).elements.namedItem('template') as HTMLInputElement;
            const file = fileInputElement.files && fileInputElement.files[0];
            if (!file) {
                throw new Error("Aucun fichier n'a été sélectionné");
            }
            const workbook = await readExcelFile(file);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const headers = raw_data.at(0) as [];
            const datas = raw_data.slice(1);
            const rows = []
            for (let incrementRow = 0; incrementRow < datas.length; incrementRow++) {
                let rowData = datas.at(incrementRow) as [string | undefined];
                const allUndefined = rowData.every((value: string | undefined) => value === undefined);
                let rowObject: { [key: string]: string | undefined } = {}; // Add type annotation
                if (!allUndefined) {
                    for (let incrementColumn = 0; incrementColumn < headers.length; incrementColumn++) {
                        let column = headers.at(incrementColumn) as unknown as string;
                        let data = rowData.at(incrementColumn) ? rowData.at(incrementColumn) : "";
                        rowObject[column] = new String(data).toString();
                    }
                }
                if (!allUndefined) {
                    rows.push(rowObject);
                }
            }

            if (templateSlug === 'rib_salaries') {
                const actions = await createTemplatePersonBank({
                    projectSlug: projectSlug,
                    templateSlug: templateSlug,
                    datas: rows as { [key: string]: string | undefined }[]
                });
                if (actions?.serverError) {
                    toast.error(`${actions.serverError}`, {
                        description: new Date().toLocaleDateString(),
                        action: {
                            label: "fermer",
                            onClick: () => console.log("fermeture"),
                        },
                    });
                }
            }
            if (templateSlug === 'enfants') {
                const actions = await createTemplateChildren({
                    projectSlug: projectSlug,
                    templateSlug: templateSlug,
                    datas: rows as { [key: string]: string | undefined }[]
                });
                if (actions?.serverError) {
                    toast.error(`${actions.serverError}`, {
                        description: new Date().toLocaleDateString(),
                        action: {
                            label: "fermer",
                            onClick: () => console.log("fermeture"),
                        },
                    });
                }
            }



        } catch (err) {
            setLoading(false);
            // handle error...
        }
        setLoading(false);

    }


    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="template">{templateSlug}</Label>
            <Input id="template" name="template" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" required />
            <Button type="submit">Envoyer</Button>
        </form>
    )

}