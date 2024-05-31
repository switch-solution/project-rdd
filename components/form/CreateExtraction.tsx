"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createExtraction } from "@/src/actions/extraction/extraction.actions";
import { ExtractionCreateSchema } from "@/src/defintion";
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
export default function CreateExtraction({ projectSlug }: { projectSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ExtractionCreateSchema>>({
        resolver: zodResolver(ExtractionCreateSchema),
        defaultValues: {
            projectSlug: projectSlug,
            label: "",
            description: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof ExtractionCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createExtraction(data)
            if (action?.serverError) {
                setLoading(false)
                toast(`${action.serverError}`, {
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
                                <Input type='hidden' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de votre extraction</FormLabel>
                            <FormControl>
                                <Input placeholder="Extraction salariés" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description de votre extraction</FormLabel>
                            <FormControl>
                                <Input placeholder="Run 1" required {...field} />
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