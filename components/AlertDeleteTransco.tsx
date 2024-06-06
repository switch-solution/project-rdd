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
import { Trash } from "lucide-react"
import { deleteTransco } from "@/src/actions/transco/transco.actions"
import { toast } from "sonner"
import type { TypeTransco } from "@/src/helpers/typeTransco"
export default function AlertDeleteTransco({ projectSlug, transcoSlug, type }: { projectSlug: string, transcoSlug: string, type: TypeTransco }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger><Trash /></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmez vous la suppression ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        const action = await deleteTransco({
                            projectSlug,
                            transcoSlug,
                            type
                        })
                        if (action?.serverError) {
                            toast.error(`${action.serverError}`, {
                                description: new Date().toLocaleDateString(),
                                action: {
                                    label: "fermer",
                                    onClick: () => console.log("fermeture"),
                                },
                            })

                        }
                        toast.success(`Suppression de l'élément`, {
                            description: new Date().toLocaleDateString(),
                            action: {
                                label: "fermer",
                                onClick: () => console.log("fermeture"),
                            },
                        })
                    }}>Continuer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}