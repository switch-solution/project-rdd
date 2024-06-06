"use client";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { DsnParser } from "@fibre44/dsn-parser";
import { toast } from "sonner"
import { uploadFileDsn } from "@/src/actions/upload/upload.actions";
import { Progress } from "@/components/ui/progress";
import { useRouter } from 'next/navigation'
import { DsnObject, EmployeeObject, EstablishmentObject, IdccObject, JobObject, SocietyObject, WorkContractObject, MutualObject, MutualEmployeeObject } from "@fibre44/dsn-parser/lib/utils/type";
type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],

}

type ExtractionDsn = {
    dsnId: string,
    dsn: DsnObject,
    society: SocietyObject,
    establishment: EstablishmentObject,
    jobs: JobObject[],
    idcc: IdccObject[],
    employees: EmployeeObject[]
    workContracts: WorkContractObject[]
    mutuals: MutualObject[]
    mutualEmployees: MutualEmployeeObject[]

}


export default function UploadFileDsn({ projectSlug }: { projectSlug: string }) {
    const router = useRouter()
    const addDSnData: Dsn[] = []

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const parseFile = async (file: File, random: string) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { id: string, value: string }[] = []
            const reader = new FileReader()
            reader.readAsText(file, 'ISO-8859-1');
            reader.onload = function (e: any) {
                // Le contenu du fichier est dans e.target.result
                dsnRows.splice(0, dsnRows.length)
                //On récupère le texte dans la variable dsnRows
                if (e.target && e.target.result) {
                    const text = e.target.result as string; //Une structure DSN ressemble à ca S10.G00.00.003,'11.0.9.0.2'
                    const lines = text.split('\n'); //On split le texte en lignes
                    dsnRows.push(...lines);
                    for (const row of dsnRows) {
                        let lineSplit = row.split(`,'`) //On split chaque ligne en colonnes
                        let id = lineSplit.at(0)
                        let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                        dsnRowsObject.push({
                            id,
                            value
                        });
                    }
                }
                resolve(dsnRowsObject);

            }//Fin boucle lecture
            reader.onerror = function (e) {
                reject(new Error("Erreur de lecture du fichier : " + e));
            };
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const dsn = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
        const files = dsn.files ? Array.from(dsn.files) : []
        for (let file of files) {
            const random = Math.random().toString(36).substring(7)
            const dsnRows = await parseFile(file, random) as { id: string, value: string }[]
            addDSnData.push({ dsnId: random, dsnRows: dsnRows })
        }

        try {
            let totalFiles = files.length
            let progressIncrement = 0
            for (const dsn of addDSnData) {
                progressIncrement = progressIncrement + 1
                setProgress(() => progressIncrement / totalFiles * 100)
                const extraction = await extractionData(dsn)
                const action = await uploadFileDsn({
                    projectSlug: projectSlug,
                    dsnData: extraction
                }
                )
                if (action?.serverError) {
                    setLoading(false);
                    toast(`${action.serverError}`, {
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
            toast(`${err}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            });
            console.error(err);
        }
        router.push(`/project/${projectSlug}`)
        setLoading(false);

    }

    const extractionData = async (dsnData: Dsn): Promise<ExtractionDsn> => {
        let dsnId = dsnData.dsnId
        const parser = new DsnParser(dsnData.dsnRows)
        const dsnDetail = parser.dsn
        const society = parser.society
        const establishment = parser.establishment
        const bank = parser.bank
        const jobs = parser.job
        const idcc = parser.idcc
        const employees = parser.employees
        const workContracts = parser.workContracts
        const mutuals = parser.mutual
        const mutualEmployees = parser.mutualEmployee
        return {
            dsnId: dsnId,
            dsn: dsnDetail,
            society: society,
            establishment: establishment,
            jobs: jobs,
            idcc: idcc,
            employees: employees,
            workContracts: workContracts,
            mutuals: mutuals,
            mutualEmployees: mutualEmployees
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="dsn">DSN</Label>
            <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
            {!loading && <Button type="submit">Envoyer</Button>}
            {loading && <Progress value={progress} />}

        </form>
    )
}