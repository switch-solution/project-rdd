"use client";
import { useState } from "react";
import { Factory } from "lucide-react";
import { createTransform } from "@/src/actions/transform/transform.actions";
import { createExtractionStat } from "@/src/actions/extraction/extraction.actions";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from 'use-debounce';
import { toast } from "sonner"
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
import type { IdListPerson, IdListSociety, IdListWorkContract } from "@/src/helpers/type";
export default function ButtonStartMigration({ projectSlug, extractionSlug, projectFileSlug, idList, status, iteratorLabel }:
    {
        projectSlug: string,
        extractionSlug: string,
        projectFileSlug: string,
        idList: IdListSociety[] | IdListPerson[] | IdListWorkContract[]
        status: 'En attente' | 'Terminé'
        iteratorLabel: 'Société' | 'Individu' | 'Contrat de travail'
    }) {
    const [loading, setLoading] = useState(false)
    const [process, setProcess] = useState(0)
    const handleClick = useDebouncedCallback(async () => {
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
            let increment = 0
            for (const id of idList) {
                switch (iteratorLabel) {
                    case 'Société':
                        const society = id as IdListSociety
                        const actionSociety = await createTransform({
                            projectSlug,
                            projectFileSlug,
                            extractionSlug,
                            siren: society.siren,
                            id: society.siren

                        })
                        break
                    case 'Individu':
                        const person = id as IdListPerson
                        const actionPerson = await createTransform({
                            projectSlug,
                            projectFileSlug,
                            extractionSlug,
                            id: person.numSS,
                            numSS: person.numSS

                        })
                        break
                    case 'Contrat de travail':
                        const workContract = id as IdListWorkContract
                        const actionWorkContract = await createTransform({
                            projectSlug,
                            projectFileSlug,
                            extractionSlug,
                            id: workContract.numSS,
                            numSS: workContract.numSS,
                            contractId: workContract.contractId
                        })
                        break
                }

                setProcess(Math.round((increment / idList.length) * 100))
                increment++

            }
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

    }, 5000)
    return (
        <>
            {loading && <span>{process}%</span>}
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