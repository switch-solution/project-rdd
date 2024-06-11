"use client";
import { useState } from "react";
import { Factory } from "lucide-react";
import { createTransform } from "@/src/actions/transform/transform.actions";
import { createExtractionStat } from "@/src/actions/extraction/extraction.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import type { IteratorLabel } from "@/src/helpers/typeTransco";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { IdListEstablishment, IdListPerson, IdListSociety, IdListWorkContract } from "@/src/helpers/type";
export default function ButtonStartMigration({ projectSlug, extractionSlug, projectFileSlug, idList, status, iteratorLabel }:
    {
        projectSlug: string,
        extractionSlug: string,
        projectFileSlug: string,
        idList: IdListSociety[] | IdListPerson[] | IdListWorkContract[]
        status: 'En attente' | 'Terminé'
        iteratorLabel: IteratorLabel
    }) {
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const rdd = async (id: unknown) => {
        try {
            switch (iteratorLabel) {
                case 'Société':
                    const society = id as IdListSociety
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        siren: society.siren,
                        id: society.siren

                    })
                    break
                case 'Individu':
                    const person = id as IdListPerson
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        id: person.numSS,
                        numSS: person.numSS

                    })
                    break
                case 'Contrat de travail':
                    const workContract = id as IdListWorkContract
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        id: workContract.numSS,
                        numSS: workContract.numSS,
                        contractId: workContract.contractId
                    })
                    break
                case 'Email':
                    const email = id as IdListPerson
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        id: email.numSS,
                        numSS: email.numSS
                    })
                    break
                case 'Enfant':
                    const enfant = id as IdListPerson
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        id: enfant.numSS,
                        numSS: enfant.numSS
                    })
                    break
                case 'Etablissement':
                    const establishment = id as IdListEstablishment
                    await createTransform({
                        projectSlug,
                        projectFileSlug,
                        extractionSlug,
                        siren: establishment.siren,
                        id: establishment.siren,
                        nic: establishment.nic

                    })
                    break
            }
        } catch (err) {
            console.error(err)
        }
    }
    let completed = 0;

    const trackProgress = (p: Promise<any>, total: number) => {
        return new Promise((resolve, reject) => {
            p.then((val) => {
                completed++;
                setProgress(Math.round((completed / total) * 100));
                resolve(val);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const handleClick = async () => {
        setLoading(true)
        try {
            toast.info(`Début du traitement`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            const startDateProcess = new Date()
            const promises = idList.map((id) => trackProgress(rdd(id), idList.length));
            await Promise.all(promises)
            const endDateProcess = new Date()
            const action = await createExtractionStat({
                projectSlug,
                extractionSlug,
                startDate: startDateProcess,
                endDate: endDateProcess,
                totalRows: idList.length,
                projectFileSlug: projectFileSlug

            })
            if (action.serverError) {
                toast.error(`Oups une erreur est survenue`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
                throw new Error(action.serverError)

            }
            setLoading(false)
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <>
            {loading && progress === 0 && <span>Préparation du traitement</span>}
            {loading && progress > 0 && <span>{progress}%</span>}
            {!loading && status === 'En attente' &&
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default"><Factory /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmez vous le traitement ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette opération va lancer la migration des données.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClick} disabled={loading}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            }



        </>

    )
}