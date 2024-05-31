"use client";
import { useState } from "react";
import { Factory } from "lucide-react";
import { createTransform } from "@/src/actions/transform/transform.actions";
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
export default function ButtonStartMigration({ projectSlug, extractionSlug, projectFileSlug, idList }:
    {
        projectSlug: string,
        extractionSlug: string,
        projectFileSlug: string,
        idList: string[],
    }) {
    const [loading, setLoading] = useState(false)
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
            for (const id of idList) {
                const action = await createTransform({
                    projectSlug,
                    projectFileSlug,
                    extractionSlug,
                    id
                })
                if (action.serverError) {
                    toast.error(`Oups une erreur est survenur}`, {
                        description: new Date().toLocaleDateString(),
                        action: {
                            label: "fermer",
                            onClick: () => console.log("fermeture"),
                        },
                    })
                    throw new Error(action.serverError)
                } else {
                    toast.success(`Traitement réalisé avec succès`, {
                        description: new Date().toLocaleDateString(),
                        action: {
                            label: "fermer",
                            onClick: () => console.log("fermeture"),
                        },
                    })
                }

            }

            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(`Oups une erreur est survenur}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            console.error(err)
        }

    }, 5000)
    return (
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick} disabled={loading}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}