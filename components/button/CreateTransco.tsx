"use client";
import { createTranscoSociety, createTranscoEstablishment, createTranscoPerson, createTranscoWorkcontract } from "@/src/actions/transco/transco.actions";
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
export default function CreataTransco({ projectSlug, type, buttonLabel }: { projectSlug: string, type: 'society' | 'establishment' | 'person' | 'workcontract', buttonLabel: string }) {
    const handleClick = useDebouncedCallback(async () => {
        try {
            toast.info(`Début du traitement`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            switch (type) {
                case 'society':
                    await createTranscoSociety({ projectSlug, type })
                    break;
                case "establishment":
                    await createTranscoEstablishment({ projectSlug, type })
                    break;
                case "person":
                    await createTranscoPerson({ projectSlug, type })
                    break;
                case "workcontract":
                    await createTranscoWorkcontract({ projectSlug, type })
                    break;
                default:
                    throw new Error('Type de transcodification inconnu')
            }
            toast.success(`Traitement réalisé avec succès`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
        } catch (err) {
            toast.error(`Oups une erreur est survenur}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            console.error(err)
        }


    }, 1000)
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">{buttonLabel}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmez vous le traitement ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Attention cette opération va supprimer l&apos;ensemble des transcodifications existantes afin de repartir des données sources.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}