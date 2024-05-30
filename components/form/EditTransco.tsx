"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import type { TypeTransco } from "@/src/helpers/typeTransco"
import { editTransco } from "@/src/actions/transco/transco.actions"
import { TranscoEditSchema } from "@/src/defintion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function EditTransco({ projectSlug, transcoSlug, newId, type }: { projectSlug: string, transcoSlug: string, newId: string | null, type: TypeTransco }) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof TranscoEditSchema>>({
        resolver: zodResolver(TranscoEditSchema),
        defaultValues: {
            projectSlug,
            transcoSlug,
            type: type,
            newId: newId || "",

        },
    })

    const onSubmit = async (data: z.infer<typeof TranscoEditSchema>) => {
        try {
            TranscoEditSchema
            setLoading(true)
            const action = await editTransco(data)
            if (action?.serverError) {
                setLoading(false)
                toast.error(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }

            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.error(err)

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="projectSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="transcoSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="newId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nouveau code</FormLabel>
                            <FormControl>
                                <Input placeholder="0001" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />

                <Button type="submit" disabled={loading}>Envoyer</Button>

            </form>
        </Form>


    )
}
